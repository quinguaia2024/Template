# Deploy no Cloudflare Pages

Este projeto é um SPA (Vite + React + `react-router-dom`) e é publicado no
Cloudflare Pages a partir da pasta `dist`.

## Configuração do projeto no Cloudflare Pages

| Campo | Valor |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (raiz do repositório) |

> Importante: não defina um *install command* manual com Bun. O projeto usa
> **apenas `package-lock.json`**, por isso o Cloudflare executa `npm ci`
> automaticamente. O `npm ci` recria a `node_modules` do zero a cada build,
> o que evita o problema de cache antigo que quebrava o binário nativo do SWC
> (`@swc/core`: `Failed to load native binding`).

## Variáveis de ambiente

Nenhuma variável é obrigatória para o build. Recomenda-se apenas fixar a
versão do Node:

```
NODE_VERSION=22
```

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

Agora o repositório tem um único lockfile (`package-lock.json`) e os
lockfiles do Bun estão no `.gitignore`.

## Desenvolvimento local

```bash
npm ci      # instala exatamente o que está no package-lock.json
npm run dev # http://localhost:8080
npm run build
npm run preview
```

Se aparecer erro de `EUSAGE` do `npm ci` dizendo que o lockfile está
dessincronizado, rode `npm install` e faça commit do `package-lock.json`
atualizado.

## Se o erro do SWC voltar

1. Confirme que `bun.lock` e `bun.lockb` **não** existem no repositório
   (`git ls-files | grep bun.lock` deve retornar vazio).
2. Confirme no painel do Cloudflare: build command `npm run build` e output
   `dist`.
3. Verifique se a variável `NODE_ENV` não está definida como `production` nas
   variáveis de ambiente do projeto. Com `NODE_ENV=production` o `npm ci`
   instala apenas dependências de produção e o `vite` (que é `devDependency`)
   não fica disponível. Se precisar manter essa variável, defina também
   `NPM_FLAGS=--include=dev`.
4. Se ainda assim falhar, a alternativa definitiva é trocar o plugin nativo
   por um baseado em Babel (sem binário nativo):

   ```bash
   npm uninstall @vitejs/plugin-react-swc
   npm install -D @vitejs/plugin-react
   ```

   e, no `vite.config.ts`, trocar
   `import react from "@vitejs/plugin-react-swc"` por
   `import react from "@vitejs/plugin-react"`.

## Rotas (SPA)

O arquivo `public/_redirects` contém:

```
/* /index.html 200
```

Assim, acessos diretos a rotas como `/dashboard` ou `/login` funcionam sem
404 no Cloudflare Pages.
