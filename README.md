# Project Crypto

Este projeto é uma aplicação React + TypeScript + Vite focada em visualização de dados de criptomoedas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática
- **Vite**: Ferramenta de build para desenvolvimento front-end
- **Redux Toolkit**: Ferramenta oficial para gerenciar estado no Redux
- **Lightweight Charts**: Biblioteca de gráficos financeiros
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers

## Requisitos

- Node.js v14 ou superior
- npm ou yarn ou pnpm
- Docker

## Instalação e Uso

### Clonando o Repositório

1. Clone o repositório:

   ```sh
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

### Rodando Localmente

1. Instale as dependências:

   ```sh
   pnpm install
   # ou
   yarn install
   ```

2. Execute a aplicação em modo de desenvolvimento:

   ```sh
    pnpm run dev
    # ou
    yarn dev
   ```

3. Para compilar a aplicação para produção:

   ```sh
    pnpm run build
    # ou
    yarn build
   ```

4. Para visualizar a build de produção:

   ```sh
    pnpm run preview
    # ou
    yarn preview
   ```

### Usando Docker

Você pode iniciar a aplicação usando Docker, tanto para desenvolvimento quanto para produção.

#### Desenvolvimento

1. Execute o comando abaixo para iniciar o ambiente de desenvolvimento usando Docker:

   ```sh
   npm run docker:dev
   ```

#### Produção

1. Execute o comando abaixo para iniciar o ambiente de produção usando Docker:

   ```sh
   npm run docker:dev
   ```

#### Estrutura de Pastas

    ```sh
      src
      ├── app
      │   └── Home
      │       └── index.tsx          # Página inicial do app
      ├── assets
      │   ├── icons
      │   └── logo.png               # Arquivo de logo
      ├── components
      │   ├── Book                   # Componente Book
      │   ├── Chart                  # Componente Chart
      │   └── Table                  # Componente Table
      ├── constants
      │   └── url.ts                 # Constantes de URL
      ├── hooks
      │   └── useRedux.ts            # Hook personalizado para Redux
      ├── interfaces
      │   └── interface.kline.ts     # Definições de tipos TypeScript
      ├── layout
      │   ├── Footer                 # Componente de rodapé
      │   └── Header                 # Componente de cabeçalho
      ├── service
      │   └── api.binance.ts         # Serviço de API da Binance
      ├── store
      │   └── slices
      │       └── index.ts           # Slices do Redux
      ├── utils
      │   └── global.css             # Estilos globais
      ├── main.tsx                   # Ponto de entrada da aplicação
      └── vite-env.d.ts              # Declarações de tipo do Vite
    ```