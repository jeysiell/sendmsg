import sys
import os
from pytubefix import YouTube
from pytubefix.cli import on_progress

# Força o terminal a usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')

if len(sys.argv) < 2:
    print("Erro: URL do vídeo não fornecida")
    sys.exit(1)

url = sys.argv[1]
destino = './assets/temp'

yt = YouTube(url)
ys = yt.streams.get_highest_resolution()

arquivo_baixado = ys.download(output_path=destino)

print(os.path.basename(arquivo_baixado))  # Retorna o nome do arquivo baixado
