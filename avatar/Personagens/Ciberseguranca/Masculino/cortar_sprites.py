from PIL import Image
from pathlib import Path
import sys


# ============================================================
# CONFIGURAÇÕES
# ============================================================

COLUNAS = 5
LINHAS = 2

LARGURA_SPRITE = 281
ALTURA_SPRITE = 495


# ============================================================
# PROCESSAR IMAGEM
# ============================================================

def cortar_sprites(caminho_imagem):

    caminho = Path(caminho_imagem)

    if not caminho.exists():
        raise FileNotFoundError(
            f"Arquivo não encontrado: {caminho}"
        )

    # Abre como RGBA = 32 bits
    imagem = Image.open(caminho).convert("RGBA")

    largura, altura = imagem.size

    print()
    print("==========================================")
    print("SPRITE SHEET")
    print("==========================================")
    print()
    print("Imagem:", caminho)
    print("Tamanho original:", largura, "x", altura)
    print("Modo:", imagem.mode)
    print()
    print("Grade:", COLUNAS, "x", LINHAS)
    print(
        "Tamanho final:",
        LARGURA_SPRITE,
        "x",
        ALTURA_SPRITE
    )
    print()

    # ========================================================
    # TAMANHO DAS CÉLULAS
    # ========================================================

    largura_celula = largura / COLUNAS
    altura_celula = altura / LINHAS

    print(
        "Célula original:",
        largura_celula,
        "x",
        altura_celula
    )
    print()

    # ========================================================
    # NOME
    # ========================================================

    nome = caminho.stem

    if "(" in nome and ")" in nome:
        numero = nome.split("(")[1].split(")")[0]
    else:
        numero = "1"

    # ========================================================
    # PASTA DE SAÍDA
    # ========================================================

    pasta_saida = (
        Path("sprites_cortados")
        / f"seguranca_{numero}"
    )

    pasta_saida.mkdir(
        parents=True,
        exist_ok=True
    )

    contador = 1

    # ========================================================
    # CORTAR 5 x 2
    # ========================================================

    for linha in range(LINHAS):

        for coluna in range(COLUNAS):

            # Coordenadas calculadas proporcionalmente
            x0 = round(coluna * largura_celula)
            y0 = round(linha * altura_celula)

            x1 = round((coluna + 1) * largura_celula)
            y1 = round((linha + 1) * altura_celula)

            # Recorta
            crop = imagem.crop(
                (x0, y0, x1, y1)
            )

            print(
                f"Sprite {contador:02d}: "
                f"recorte {crop.width}x{crop.height}"
            )

            # =================================================
            # AJUSTAR PARA 281 x 495
            # =================================================

            sprite = crop.resize(
                (
                    LARGURA_SPRITE,
                    ALTURA_SPRITE
                ),
                Image.Resampling.NEAREST
            )

            # Garantir RGBA
            sprite = sprite.convert("RGBA")

            # =================================================
            # SALVAR
            # =================================================

            arquivo = (
                pasta_saida
                / f"masculino_{contador:02d}.png"
            )

            sprite.save(
                arquivo,
                format="PNG"
            )

            print(
                f"  -> criado: {arquivo.name}"
            )

            contador += 1

    # ========================================================
    # FINAL
    # ========================================================

    print()
    print("==========================================")
    print("CONCLUÍDO")
    print("==========================================")
    print()
    print("Sprites:", contador - 1)
    print(
        "Tamanho:",
        LARGURA_SPRITE,
        "x",
        ALTURA_SPRITE
    )
    print("Formato: PNG")
    print("Modo: RGBA / 32 bits")
    print()
    print("Pasta:")
    print(pasta_saida.resolve())
    print()


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

if __name__ == "__main__":

    if len(sys.argv) < 2:

        print("Uso:")
        print(
            'python cortar_sprites.py "1.png"'
        )

        sys.exit(1)

    cortar_sprites(
        sys.argv[1]
    )