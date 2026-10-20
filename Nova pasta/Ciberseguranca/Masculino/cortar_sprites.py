from PIL import Image
import cv2
import numpy as np
from pathlib import Path

# ============================================================
# Corta uma sprite sheet em personagens individuais.
# Requisitos:
#   pip install pillow opencv-python numpy
#
# Uso:
#   python cortar_sprites.py sua_imagem.png
#
# Saída:
#   sprites_cortados/sprite_01.png ...
#   sprites_cortados/sheet_32x32.png
#
# O script funciona melhor quando o PNG realmente possui
# transparência. Também possui fallback para fundo uniforme.
# ============================================================

INPUT = Path(__import__("sys").argv[1] if len(__import__("sys").argv) > 1 else "sprites.png")
OUT = Path("sprites_cortados")
# Tamanho final recomendado para sprites deste tipo.
# 32x32 é pequeno demais para preservar os detalhes da arte original.
SIZE = 128
PADDING = 4

# Para pixel art, NEAREST preserva pixels e evita suavização/blur.
RESAMPLE = Image.Resampling.NEAREST


def alpha_mask(img):
    """Máscara dos pixels visíveis."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    a = np.array(img.getchannel("A"))
    return (a > 8).astype(np.uint8) * 255


def fallback_mask(img):
    """Fallback para PNG/JPG sem alpha: remove o fundo das bordas."""
    rgb = np.array(img.convert("RGB"))
    h, w = rgb.shape[:2]

    # Estima a cor do fundo usando os quatro cantos.
    corners = np.array([
        rgb[0, 0], rgb[0, w-1], rgb[h-1, 0], rgb[h-1, w-1]
    ], dtype=np.float32)
    bg = np.median(corners, axis=0)

    dist = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)

    # Limiar adaptativo simples.
    threshold = max(18, np.percentile(dist, 65) * 0.35)
    mask = (dist > threshold).astype(np.uint8) * 255

    # Limpa pequenos ruídos e fecha pequenos buracos.
    kernel = np.ones((3, 3), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    return mask


def find_components(mask, image_area):
    """Encontra personagens por componentes conectados."""
    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)

    boxes = []
    min_area = image_area * 0.002
    max_area = image_area * 0.35

    for i in range(1, n):
        x, y, w, h, area = stats[i]
        if min_area <= area <= max_area and w >= 20 and h >= 30:
            boxes.append((x, y, w, h, area))

    # Ordena primeiro por linha e depois por coluna.
    boxes.sort(key=lambda b: (b[1], b[0]))

    # Agrupa por linhas para não misturar personagens.
    rows = []
    for box in boxes:
        x, y, w, h, area = box
        cy = y + h / 2
        placed = False

        for row in rows:
            avg_cy = np.mean([r[1] + r[3] / 2 for r in row])
            avg_h = np.mean([r[3] for r in row])
            if abs(cy - avg_cy) < avg_h * 0.45:
                row.append(box)
                placed = True
                break

        if not placed:
            rows.append([box])

    rows.sort(key=lambda row: min(r[1] for r in row))
    final = []
    for row in rows:
        row.sort(key=lambda b: b[0])
        final.extend(row)

    return final


def crop_tight(img, box, mask):
    """Recorta exatamente o conteúdo visível."""
    x, y, w, h, _ = box

    # Pequena margem para não cortar sapatos/cabelos.
    x0 = max(0, x - PADDING)
    y0 = max(0, y - PADDING)
    x1 = min(img.width, x + w + PADDING)
    y1 = min(img.height, y + h + PADDING)

    crop = img.crop((x0, y0, x1, y1)).convert("RGBA")

    # Se não havia alpha, cria transparência baseada na máscara.
    if img.mode != "RGBA" or np.array(img.getchannel("A")).max() < 255:
        cm = mask[y0:y1, x0:x1]
        rgba = np.array(crop)
        rgba[:, :, 3] = cm
        crop = Image.fromarray(rgba, "RGBA")

    return crop


def fit_32(crop):
    """Coloca o personagem inteiro dentro de 32x32, sem deformar."""
    crop.thumbnail((SIZE - 4, SIZE - 4), RESAMPLE)

    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    x = (SIZE - crop.width) // 2
    y = (SIZE - crop.height) // 2
    canvas.alpha_composite(crop, (x, y))
    return canvas


def main():
    if not INPUT.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {INPUT}")

    img = Image.open(INPUT).convert("RGBA")
    mask = alpha_mask(img)

    # Se o alpha estiver praticamente todo opaco, tenta fallback.
    alpha_pixels = np.array(img.getchannel("A"))
    if np.count_nonzero(alpha_pixels > 8) > img.width * img.height * 0.98:
        mask = fallback_mask(img)

    boxes = find_components(mask, img.width * img.height)

    if not boxes:
        raise RuntimeError(
            "Nenhum personagem foi encontrado. "
            "Use um PNG com fundo transparente ou ajuste o fallback."
        )

    OUT.mkdir(exist_ok=True)

    sprites = []
    for i, box in enumerate(boxes, start=1):
        crop = crop_tight(img, box, mask)
        # Salva também o recorte em resolução original, sem redimensionar.
        crop.save(OUT / f"sprite_{i:02d}_original.png")

        sprite = fit_32(crop)
        sprite.save(OUT / f"sprite_{i:02d}_{SIZE}x{SIZE}.png")
        sprites.append(sprite)

    # Monta uma folha 5 colunas x N linhas, preservando transparência.
    cols = 5
    rows = (len(sprites) + cols - 1) // cols
    sheet = Image.new("RGBA", (cols * SIZE, rows * SIZE), (0, 0, 0, 0))

    for i, sprite in enumerate(sprites):
        x = (i % cols) * SIZE
        y = (i // cols) * SIZE
        sheet.alpha_composite(sprite, (x, y))

    sheet.save(OUT / f"sheet_{SIZE}x{SIZE}.png")

    print(f"{len(sprites)} sprites encontrados.")
    print(f"Arquivos salvos em: {OUT.resolve()}")


if __name__ == "__main__":
    main()
