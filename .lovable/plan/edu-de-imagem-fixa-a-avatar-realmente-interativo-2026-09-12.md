# EDU: de imagem fixa a avatar realmente interativo

Hoje o EDU é uma única imagem que flutua, oscila e "pisca" apenas encolhendo ligeiramente. Nada dentro dele se mexe. A proposta é separá-lo em peças e animar cada uma, mantendo o mesmo desenho da mascote.

## O que vais ver

- **Olhos que seguem o rato/dedo** — as pupilas movem-se dentro dos olhos conforme a posição do cursor na página.
- **Piscar a sério** — pálpebras que fecham e abrem, com ritmo irregular e piscadela dupla ocasional.
- **Braço que acena** — aceno automático de vez em quando e sempre que tocas nele ou quando o balão abre.
- **Reações ao toque** — salto com esticar/encolher, cabeça a inclinar para o lado do cursor e olhos "felizes" (arqueados) durante a reação.
- **Estados de humor** — normal (a flutuar), atento (quando estás a ler uma secção nova), animado (ao clicar), a dormir (após ~45s sem interação: olhos fechados e respiração lenta; acorda ao mexeres o rato).
- **Boca/expressão** que muda entre sorriso e "a falar" enquanto o balão está aberto.

Tudo continua a funcionar como agora: arrastar, memória do balão por secção, botões "Sou Aluno" / "Sou Tutor", e o "×" para esconder.

## Como será feito (parte técnica)

1. Gerar, a partir do avatar atual, camadas separadas em PNG transparente: corpo+cabeça sem olhos nem braço direito, e o braço isolado. Guardadas em `src/assets/edu/`.
2. Sobrepor os olhos e a boca como SVG vetorial posicionado por percentagem sobre a camada do corpo — assim as pupilas, pálpebras e sorriso são animáveis sem depender de imagens.
3. Novo componente `EduRig.tsx` (dentro de `src/components/landing/`) que recebe `mood` ("idle" | "attentive" | "excited" | "sleeping" | "talking") e trata das animações internas: olhar, piscar, aceno, respiração.
4. `EduCompanion.tsx` passa a renderizar `<EduRig mood={...} />` em vez do `<img>`; toda a lógica de scroll, mensagens, localStorage e arrasto fica intacta.
5. Performance: um único listener de `pointermove` com `requestAnimationFrame`, transformações via `translate3d`/`will-change-transform`, animações internas desligadas quando o separador não está visível e quando o sistema pede `prefers-reduced-motion`.

## Alternativa mais leve

Se preferires evitar recortes de imagem, dá para manter a imagem inteira e sobrepor apenas olhos e um brilho de "vida" — menos expressivo (sem aceno de braço), mas mais rápido de fazer.
