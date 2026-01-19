# Pet Manager Frontend

SPA em React + TypeScript para cadastro e gestao de pets e tutores, consumindo a API publica do Pet Manager.

## Vaga e inscricao
- Vaga: Desenvolvedor Front End (Projeto ANEXO II-B)
- Candidato(a): [RAPHAEL MONTEIRO PIRES]
- E-mail de inscricao: [raphael.pires@gmail.com]
- Data de entrega: [22/01/2025]

## Links
- Swagger: https://pet-manager-api.geia.vip/q/swagger-ui/

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod

## Funcionalidades do Edital
- [x] Login JWT
- [x] Refresh token (renovacao automatica)
- [x] Rotas protegidas
- [x] Lazy loading de rotas/modulos
- [x] Paginacao (server-side)
- [x] Tratamento de erros (API e UI)
- [ ] Testes unitarios 
- [x] Docker + Nginx
- [x] Docker Compose 

## Autenticacao (JWT + Refresh)
- Tokens armazenados no `localStorage` (`pm_token` e `pm_refresh_token`).
- O `access_token` eh renovado automaticamente em respostas `401` via interceptor do Axios.
- Se o refresh expirar ou falhar, os tokens sao limpos e o usuario eh redirecionado para `/login`.

## Rotas
- Publicas: `/login`
- Protegidas:
  - `/` (redireciona para `/pets`)
  - `/pets`, `/pets/new`, `/pets/:id`
  - `/tutores`, `/tutores/new`, `/tutores/:id`

## Paginacao/Scroll
- Paginacao **server-side**, usando `page` e `size` como query params nas listagens.
- Nao ha infinite scroll; a navegacao eh por botoes "Anterior/Proxima".

## Lazy loading
- Modulos de rotas de Pets e Tutores carregados sob demanda com `React.lazy` + `Suspense`.

## Tratamento de erros
- `401`: tenta refresh automatico; se falhar, limpa sessao e redireciona para `/login`.
- `403/500`: erro propagado com mensagem padrao e exibido em `ErrorState`.
- Fallbacks de UI para estados vazios e carregamento (`EmptyState`, `Loading`).

## Testes unitarios
- Ainda nao configurados.
- Planejado: `npm run test` com Vitest.

## Arquitetura e organizacao
- `src/pages`: telas principais (Pets, Tutores, Login)
- `src/components`: componentes reutilizaveis (forms, layout, UI)
- `src/hooks`: regras de negocio e estado das telas
- `src/services`: comunicacao com API
- `src/validators`: schemas do Zod
- `src/utils`: helpers e mascaras

## Requisitos
- Node.js 18+ (recomendado 20+)

## Variaveis de ambiente
- `VITE_API_BASE_URL` (opcional): URL base da API.
  - Se nao informado, o frontend usa URLs relativas.

## Instalacao
```
npm install
```

## Execucao (Vite)
```
npm run dev
```

## Build
```
npm run build
```

## Preview do build
```
npm run preview
```

## Scripts uteis
- `npm run dev` (ambiente de desenvolvimento)
- `npm run build` (gera a pasta `dist`)
- `npm run preview` (servir build localmente)
- `npm run typecheck` (checagem de tipos)
- `npm run test` (nao configurado)
- `npm run lint` (nao configurado)

## Container (Docker)
```
docker build -t pet-manager-frontend .
docker run --rm -p 8080:80 pet-manager-frontend
```

## Como rodar com 1 comando (Docker Compose)
```
docker compose up --build
```

Acesse: `http://localhost:8080`

## Deploy (referencia)
- Build gera a pasta `dist`
- Servir com Nginx ou outro servidor estatico
