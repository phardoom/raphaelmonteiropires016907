# Pet Manager Frontend

SPA em React + TypeScript para cadastro e gestao de pets e tutores, consumindo a API publica do Pet Manager.

## Vaga e inscricao
- Vaga: Desenvolvedor Front End (Projeto ANEXO II-B)
- Candidato(a): [preencher]
- E-mail de inscricao: [preencher]
- Data de entrega: [preencher]

## Links
- Swagger: https://pet-manager-api.geia.vip/q/swagger-ui/

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod

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

## Testes
```
npm run typecheck
```

## Container (Docker)
```
docker build -t pet-manager-frontend .
docker run --rm -p 8080:80 pet-manager-frontend
```

## Deploy (referencia)
- Build gera a pasta `dist`
- Servir com Nginx ou outro servidor estatico
