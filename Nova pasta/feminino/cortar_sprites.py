from PIL import Image
import cv2
import numpy as np
from pathlib import Path
import sys


# ============================================================
# CORTADOR DE SPRITES - CIBERSEGURANÇA
#
# PADRÃO ORIGINAL DE PROGRAMAÇÃO
#
# Entrada:
#   Sprite sheet com 10 personagens
#   5 colunas x 2 linhas
#
# Saída:
#   sprites_cortados/
#       seguranca (1).png
#       seguranca (2).png
#       ...
#       seguranca (10).png
#
# PADRÃO FINAL:
#   Largura:       281 px
#   Altura:        495 px
#   Profundidade:  32-bit RGBA
#   Fundo:         transparente
#   Pixel art:     NEAREST
#
# CORREÇÃO:
#   Ignora uma pequena faixa nas bordas de cada célula
#   para impedir que partes de personagens vizinhos
#   sejam capturadas.
# ============================================================


# ============================================================
# CONFIGURAÇÕES
# ============================================================

INPUT = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "sprites.png"
)

OUT = Path("sprites_cortados")


# ============================================================
# DIMENSÃO FINAL
# ============================================================

SIZE_WIDTH = 281
SIZE_HEIGHT = 495


# ============================================================
# MARGEM AO REDOR DO PERSONAGEM
# ============================================================

PADDING = 2


# ============================================================
# CONFIGURAÇÃO DA SPRITE SHEET
# ============================================================

COLS = 5
ROWS = 2


# ============================================================
# MARGEM DE SEGURANÇA DAS CÉLULAS
#
# Essa margem impede que um pedaço do personagem vizinho
# entre no recorte.
#
# Exemplo:
#
# personagem | personagem
#     ↑             ↑
#   corta aqui   corta aqui
# ============================================================

CELL_MARGIN_X = 8
CELL_MARGIN_Y = 8


# ============================================================
# QUALIDADE PIXEL ART
# ============================================================

RESAMPLE = Image.Resampling.NEAREST


# ============================================================
# REMOVE FUNDO XADREZ
# ============================================================

def remover_fundo_xadrez(img):

    rgba = np.array(
        img.convert("RGBA")
    )

    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]

    h, w = rgb.shape[:2]


    # --------------------------------------------------------
    # Se já existe transparência real
    # --------------------------------------------------------

    if np.min(alpha) < 250:

        mask = alpha.copy()

        mask_bin = (
            (mask > 8)
            .astype(np.uint8)
            * 255
        )

        kernel = np.ones(
            (3, 3),
            np.uint8
        )

        mask_bin = cv2.morphologyEx(
            mask_bin,
            cv2.MORPH_OPEN,
            kernel
        )

        mask_bin = cv2.morphologyEx(
            mask_bin,
            cv2.MORPH_CLOSE,
            kernel
        )

        rgba[:, :, 3] = mask_bin

        return Image.fromarray(
            rgba,
            "RGBA"
        )


    # --------------------------------------------------------
    # Detecta cores do fundo pelas bordas
    # --------------------------------------------------------

    bordas = np.concatenate([
        rgb[0, :, :],
        rgb[h - 1, :, :],
        rgb[:, 0, :],
        rgb[:, w - 1, :]
    ])


    cores, contagens = np.unique(
        bordas.reshape(-1, 3),
        axis=0,
        return_counts=True
    )


    indices = np.argsort(
        contagens
    )[::-1]


    cores_fundo = []


    for i in indices[:12]:

        cor = cores[i]

        if np.mean(cor) > 140:

            cores_fundo.append(
                cor.astype(
                    np.float32
                )
            )


    # --------------------------------------------------------
    # Fallback usando os cantos
    # --------------------------------------------------------

    if len(cores_fundo) == 0:

        cores_fundo = [

            rgb[0, 0].astype(
                np.float32
            ),

            rgb[0, w - 1].astype(
                np.float32
            ),

            rgb[h - 1, 0].astype(
                np.float32
            ),

            rgb[h - 1, w - 1].astype(
                np.float32
            )
        ]


    # --------------------------------------------------------
    # Calcula distância para as cores do fundo
    # --------------------------------------------------------

    rgb_float = rgb.astype(
        np.float32
    )


    dist_min = np.full(
        (h, w),
        9999,
        dtype=np.float32
    )


    for cor in cores_fundo:

        dist = np.linalg.norm(
            rgb_float - cor,
            axis=2
        )

        dist_min = np.minimum(
            dist_min,
            dist
        )


    # --------------------------------------------------------
    # Máscara do possível fundo
    # --------------------------------------------------------

    fundo = (
        dist_min < 22
    ).astype(
        np.uint8
    ) * 255


    # --------------------------------------------------------
    # Limpeza pequena
    # --------------------------------------------------------

    kernel = np.ones(
        (3, 3),
        np.uint8
    )


    fundo = cv2.morphologyEx(
        fundo,
        cv2.MORPH_OPEN,
        kernel
    )


    # --------------------------------------------------------
    # Somente fundo conectado às bordas
    # --------------------------------------------------------

    num_labels, labels = cv2.connectedComponents(
        fundo,
        connectivity=8
    )


    fundo_borda = np.zeros(
        (h, w),
        dtype=np.uint8
    )


    labels_borda = set()


    labels_borda.update(
        np.unique(
            labels[0, :]
        )
    )


    labels_borda.update(
        np.unique(
            labels[h - 1, :]
        )
    )


    labels_borda.update(
        np.unique(
            labels[:, 0]
        )
    )


    labels_borda.update(
        np.unique(
            labels[:, w - 1]
        )
    )


    for label in labels_borda:

        if label != 0:

            fundo_borda[
                labels == label
            ] = 255


    # --------------------------------------------------------
    # Cria canal alpha
    # --------------------------------------------------------

    novo_alpha = np.where(
        fundo_borda > 0,
        0,
        255
    ).astype(
        np.uint8
    )


    rgba[:, :, 3] = novo_alpha


    return Image.fromarray(
        rgba,
        "RGBA"
    )


# ============================================================
# ENCONTRA O PERSONAGEM
# ============================================================

def encontrar_area_personagem(img):

    rgba = np.array(
        img.convert("RGBA")
    )


    alpha = rgba[:, :, 3]


    ys, xs = np.where(
        alpha > 8
    )


    if len(xs) == 0 or len(ys) == 0:

        return None


    x0 = int(
        xs.min()
    )


    y0 = int(
        ys.min()
    )


    x1 = int(
        xs.max()
    ) + 1


    y1 = int(
        ys.max()
    ) + 1


    return (
        x0,
        y0,
        x1,
        y1
    )


# ============================================================
# RECORTA O PERSONAGEM
# ============================================================

def crop_tight(img):

    box = encontrar_area_personagem(
        img
    )


    if box is None:

        return None


    x0, y0, x1, y1 = box


    # --------------------------------------------------------
    # Pequena margem ao redor do personagem
    # --------------------------------------------------------

    x0 = max(
        0,
        x0 - PADDING
    )


    y0 = max(
        0,
        y0 - PADDING
    )


    x1 = min(
        img.width,
        x1 + PADDING
    )


    y1 = min(
        img.height,
        y1 + PADDING
    )


    return img.crop(
        (
            x0,
            y0,
            x1,
            y1
        )
    ).convert(
        "RGBA"
    )


# ============================================================
# COLOCA NO PADRÃO 281x495
# ============================================================

def preparar_sprite(crop):

    """
    Cria exatamente:

        281 x 495

    Mantém a proporção original.

    Não distorce o personagem.

    Usa NEAREST para preservar pixel art.
    """

    crop = crop.copy()


    # --------------------------------------------------------
    # Área máxima disponível
    # --------------------------------------------------------

    max_width = SIZE_WIDTH - 4

    max_height = SIZE_HEIGHT - 4


    # --------------------------------------------------------
    # Escala proporcional
    # --------------------------------------------------------

    escala = min(

        max_width / crop.width,

        max_height / crop.height

    )


    novo_width = max(
        1,
        round(
            crop.width * escala
        )
    )


    novo_height = max(
        1,
        round(
            crop.height * escala
        )
    )


    # --------------------------------------------------------
    # Redimensiona com NEAREST
    # --------------------------------------------------------

    crop = crop.resize(
        (
            novo_width,
            novo_height
        ),
        RESAMPLE
    )


    # --------------------------------------------------------
    # Canvas final transparente
    # --------------------------------------------------------

    canvas = Image.new(

        "RGBA",

        (
            SIZE_WIDTH,
            SIZE_HEIGHT
        ),

        (
            0,
            0,
            0,
            0
        )
    )


    # --------------------------------------------------------
    # Centraliza horizontalmente
    # --------------------------------------------------------

    x = (
        SIZE_WIDTH - crop.width
    ) // 2


    # --------------------------------------------------------
    # Centraliza verticalmente
    # --------------------------------------------------------

    y = (
        SIZE_HEIGHT - crop.height
    ) // 2


    # --------------------------------------------------------
    # Coloca personagem
    # --------------------------------------------------------

    canvas.alpha_composite(
        crop,
        (
            x,
            y
        )
    )


    return canvas


# ============================================================
# PROCESSA A SPRITE SHEET
# ============================================================

def main():

    # --------------------------------------------------------
    # Verifica arquivo
    # --------------------------------------------------------

    if not INPUT.exists():

        raise FileNotFoundError(

            f"Arquivo não encontrado: {INPUT}"

        )


    # --------------------------------------------------------
    # Abre imagem
    # --------------------------------------------------------

    img = Image.open(
        INPUT
    ).convert(
        "RGBA"
    )


    print()
    print(
        "========================================"
    )

    print(
        "       CORTADOR DE SPRITES"
    )

    print(
        "       CIBERSEGURANÇA"
    )

    print(
        "========================================"
    )

    print()


    print(
        f"Imagem encontrada: {INPUT}"
    )


    print(
        f"Tamanho da sheet: "
        f"{img.width}x{img.height}"
    )


    print(
        "Formato da sheet: 5 colunas x 2 linhas"
    )


    print(
        f"Margem de segurança: "
        f"{CELL_MARGIN_X}px horizontal / "
        f"{CELL_MARGIN_Y}px vertical"
    )


    print()


    # --------------------------------------------------------
    # Cria pasta
    # --------------------------------------------------------

    OUT.mkdir(
        exist_ok=True
    )


    # --------------------------------------------------------
    # Tamanho das células
    # --------------------------------------------------------

    cell_width = (
        img.width // COLS
    )


    cell_height = (
        img.height // ROWS
    )


    print(
        f"Células originais: "
        f"{cell_width}x{cell_height}"
    )


    print()


    contador = 0


    # ========================================================
    # PERCORRE LINHAS
    # ========================================================

    for row in range(ROWS):

        for col in range(COLS):

            contador += 1


            # ------------------------------------------------
            # Limites da célula original
            # ------------------------------------------------

            original_x0 = (
                col * cell_width
            )


            original_y0 = (
                row * cell_height
            )


            original_x1 = (
                original_x0 +
                cell_width
            )


            original_y1 = (
                original_y0 +
                cell_height
            )


            # ------------------------------------------------
            # Aplica margem de segurança
            #
            # IMPORTANTE:
            # Não usamos margem nas bordas externas da sheet.
            #
            # Isso evita perder partes do personagem
            # que estejam próximas da borda externa.
            # ------------------------------------------------

            if col == 0:

                x0 = original_x0

            else:

                x0 = (
                    original_x0 +
                    CELL_MARGIN_X
                )


            if col == COLS - 1:

                x1 = original_x1

            else:

                x1 = (
                    original_x1 -
                    CELL_MARGIN_X
                )


            if row == 0:

                y0 = original_y0

            else:

                y0 = (
                    original_y0 +
                    CELL_MARGIN_Y
                )


            if row == ROWS - 1:

                y1 = original_y1

            else:

                y1 = (
                    original_y1 -
                    CELL_MARGIN_Y
                )


            # ------------------------------------------------
            # Segurança contra valores inválidos
            # ------------------------------------------------

            if x1 <= x0 or y1 <= y0:

                print(
                    f"⚠️ Célula {contador} inválida."
                )

                continue


            # ------------------------------------------------
            # Corta somente a área segura
            # ------------------------------------------------

            cell = img.crop(
                (
                    x0,
                    y0,
                    x1,
                    y1
                )
            )


            # ------------------------------------------------
            # Remove fundo
            # ------------------------------------------------

            cell = remover_fundo_xadrez(
                cell
            )


            # ------------------------------------------------
            # Recorta personagem
            # ------------------------------------------------

            crop = crop_tight(
                cell
            )


            if crop is None:

                print(
                    f"⚠️ Personagem "
                    f"{contador} não encontrado."
                )

                continue


            # ------------------------------------------------
            # Prepara 281x495
            # ------------------------------------------------

            sprite = preparar_sprite(
                crop
            )


            # ------------------------------------------------
            # Nome do arquivo
            # ------------------------------------------------

            nome = (
                f"seguranca ({contador}).png"
            )


            destino = (
                OUT / nome
            )


            # ------------------------------------------------
            # Salva PNG 32-bit RGBA
            # ------------------------------------------------

            sprite.save(
                destino,
                "PNG"
            )


            # ------------------------------------------------
            # Confirma
            # ------------------------------------------------

            print(
                f"✅ {nome} "
                f"→ 281x495 "
                f"RGBA 32-bit"
            )


    # ========================================================
    # FINAL
    # ========================================================

    print()


    print(
        "========================================"
    )


    print(
        f"✅ {contador} sprites processados."
    )


    print(
        "📐 Dimensão: 281x495"
    )


    print(
        "🎨 Profundidade: 32-bit RGBA"
    )


    print(
        "🖼️ Fundo: transparente"
    )


    print(
        "🎮 Qualidade: pixel art / NEAREST"
    )


    print(
        "✂️ Separação: margem anti-vazamento"
    )


    print(
        f"📁 Pasta: {OUT.resolve()}"
    )


    print(
        "========================================"
    )


# ============================================================
# EXECUÇÃO
# ============================================================

if __name__ == "__main__":

    main()