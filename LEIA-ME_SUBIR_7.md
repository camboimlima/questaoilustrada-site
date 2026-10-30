# SUBIR_AGORA_7 — rastreio UTM + Clarity

## Como subir (GitHub → repo questaoilustrada-site → Add file → Upload files)
Arraste os 4 arquivos desta pasta (index.html, geometria.html, previa.html, qi-track.js); imagens e PDF não mudaram. Commit. Espere ~1 min.
NÃO apague CNAME nem favicon.svg do repositório.
A página /comboenem ainda não tem o rastreio: me mande o arquivo dela para eu incluir (1 linha antes de </body>):
`<script src="/qi-track.js" defer></script>`

## Testar
Abra https://questaoilustrada.com/?utm_source=teste&utm_medium=teste → aparece o aviso de cookies → clique no botão comprar do /geometria: o link do Kiwify deve ter ?utm_source=teste...
No Clarity (Settings > Setup) o status vira "Collecting data" em até ~30 min.

## Links UTM (use sempre esses; mude só utm_campaign por campanha)
Base: https://questaoilustrada.com
| Onde | Link |
|---|---|
| Bio Instagram | /?utm_source=instagram&utm_medium=bio&utm_campaign=perfil |
| Stories (adesivo link) | /geometria?utm_source=instagram&utm_medium=stories&utm_campaign=fuvest_2fase |
| Reels (legenda/comentário fixado) | /geometria?utm_source=instagram&utm_medium=reels&utm_campaign=resolucoes |
| Resposta automática/DM | /geometria?utm_source=instagram&utm_medium=dm&utm_campaign=comente_desconto |
| Bio TikTok | /?utm_source=tiktok&utm_medium=bio&utm_campaign=perfil |
| Descrição YouTube (vídeos) | /geometria?utm_source=youtube&utm_medium=descricao&utm_campaign=resolucoes |
| Comentário fixado YouTube | /geometria?utm_source=youtube&utm_medium=comentario&utm_campaign=resolucoes |
| Grupo/Lista WhatsApp | /geometria?utm_source=whatsapp&utm_medium=grupo&utm_campaign=lista |
| Combo ENEM — Stories | /comboenem?utm_source=instagram&utm_medium=stories&utm_campaign=enem_combo |
| Combo ENEM — final do vídeo de resolução | /comboenem?utm_source=youtube&utm_medium=descricao&utm_campaign=enem_combo |
| Combo ENEM — Reels | /comboenem?utm_source=instagram&utm_medium=reels&utm_campaign=enem_combo |
| Combo ENEM — WhatsApp | /comboenem?utm_source=whatsapp&utm_medium=grupo&utm_campaign=enem_combo |

No Kiwify: Vendas → filtrar por "Parâmetros da URL" (utm_source, s1 = primeiro toque).
