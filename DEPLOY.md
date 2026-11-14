# Deploy no Cloudflare Workers (Vite + React)

O projeto é um SPA (Vite + React + `react-router-dom`) publicado como um
Worker com **Static Assets**, gerado a partir da pasta `dist`.

## Configuração no Cloudflare (Workers Builds)

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Build output directory | `dist` |
| Root directory | `/` (raiz do repositório) |

O Worker se chama `info-site` e a configuração fica versionada em
`wrangler.jsonc`:

```jsonc
{
  "name": "info-site",
  "compatibility_date": "2026-11-13",
  "observability": { "enabled": true },
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

Com `not_found_handling: "single-page-application"`, rotas como `/login` e
`/dashboard` caem em `index.html` automaticamente.

> **Não adicione `public/_redirects`** com `/* /index.html 200` neste projeto.
> Os Workers Assets já normalizam `.html`/`/index`, e essa regra é rejeitada
> no deploy com `Invalid _redirects configuration: Infinite loop detected`
> (código `100324`). O fallback de SPA já vem do `not_found_handling`.

## Por que só existe um lockfile

O repositório já teve `bun.lock`, `bun.lockb` e `package-lock.json` ao mesmo
tempo. O Cloudflare escolhe o gerenciador de pacotes pela presença do
lockfile e, como existia `bun.lock`, rodava `bun install --frozen-lockfile`.
O cache de dependências do Cloudflare podia reaproveitar uma `node_modules`
incompleta (sem `@swc/core-linux-x64-gnu`), fazendo o build falhar com:

```
Error: Failed to load native binding
    at Object.<anonymous> (/opt/buildhome/repo/node_modules/@swc/core/binding.js:345:11)
```

Agora o repositório tem um único lockfile (`package-lock.json`) e o
Cloudflare executa `npm clean-install`, que recria a `node_modules` do zero.

## Desenvolvimento local

```bash
npm ci      # instala exatamente o que está no package-lock.json
npm run dev # http://localhost:8080
npm run build
npm run preview
```

Se o `npm ci` reclamar de lockfile dessincronizado (`EUSAGE`), rode
`npm install` e faça commit do `package-lock.json` atualizado.

## Se o erro do SWC voltar

1. Confirme que `bun.lock` e `bun.lockb` **não** existem no repositório
   (`git ls-files | grep bun.lock` deve retornar vazio).
2. Verifique se `NODE_ENV` não está definido como `production` nas variáveis
   de ambiente do build. Com `NODE_ENV=production` o `npm ci` instala apenas
   dependências de produção e o `vite` (que é `devDependency`) não fica
   disponível. Se precisar manter a variável, defina também
   `NPM_FLAGS=--include=dev`.
3. Alternativa definitiva, sem binário nativo: trocar
   `@vitejs/plugin-react-swc` por `@vitejs/plugin-react` (Babel).

   ```bash
   npm uninstall @vitejs/plugin-react-swc
   npm install -D @vitejs/plugin-react
   ```

   e no `vite.config.ts` usar `import react from "@vitejs/plugin-react";`.
