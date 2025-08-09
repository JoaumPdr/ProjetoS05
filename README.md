# Projeto Final de Interação Humano-Computador

Este é o projeto final da disciplina de Interação Humano-Computador, que consiste em um portal para estudantes do Inatel com funcionalidades como autenticação, visualização de informações acadêmicas, acesso a um restaurante virtual e um carrossel de eventos.

## 🚀 Visão Geral do Projeto

O projeto é uma aplicação web desenvolvida com **React, TypeScript e Vite**, utilizando **Tailwind CSS** para estilização e **Framer Motion** para animações. A aplicação oferece uma experiência de usuário moderna e interativa, com foco na usabilidade e na acessibilidade.

## 📁 Estrutura de Arquivos

O projeto está organizado da seguinte forma:
```
├── .github/
│   └── workflows/
│       └── deploy.yml      # Configuração do deploy para o GitHub Pages
├── dist/                   # Pasta de build (saída) da aplicação
├── src/
│   ├── components/         # Componentes reutilizáveis (Cards, Popups, etc.)
│   ├── contexts/           # Contextos da aplicação (Autenticação, Tema)
│   ├── pages/              # Páginas da aplicação (Login, Home, Restaurante)
│   ├── routes/             # Configuração de rotas da aplicação
│   ├── App.tsx             # Componente raiz que envolve a aplicação
│   └── main.tsx            # Ponto de entrada da aplicação React
├── index.html              # Arquivo HTML principal
├── package.json            # Lista de dependências e scripts do projeto
├── tailwind.config.js      # Arquivo de configuração do Tailwind CSS
└── vite.config.ts          # Arquivo de configuração do Vite
```
## ✨ Funcionalidades Principais

* **Autenticação de Usuário:** Sistema de login seguro para acesso ao portal.
* **Página Inicial Personalizada:** Exibe informações relevantes para o aluno, como nome, e-mail e atalhos para funcionalidades.
* **Modo Claro e Escuro:** Permite ao usuário alternar entre os temas para melhor visualização.
* **Widgets de Acesso Rápido:** Cards que exibem informações sobre as próximas provas, aulas e trabalhos.
* **Carrossel de Eventos:** Um carrossel interativo que mostra os próximos eventos do Inatel.
* **Página do Restaurante (INAFOOD):** Um portal para o restaurante do Inatel, onde os alunos podem visualizar o cardápio, adicionar itens ao carrinho e fazer pedidos.
* **Carrinho de Compras:** Funcionalidade de carrinho de compras para o restaurante, com cálculo do valor total do pedido.
* **Pop-ups de Calendário:** Exibem detalhes sobre provas, aulas e trabalhos em um pop-up de fácil visualização.

## ⚙️ Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/joaumpdr/ProjetoS05.git](https://github.com/joaumpdr/ProjetoS05.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd "Projeto S05/project"
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará disponível em `http://localhost:5173`.

## 🌍 Deploy

O projeto é configurado para fazer deploy automaticamente no GitHub Pages sempre que um push é feito para a branch `main`. O arquivo de configuração do deploy (`.github/workflows/deploy.yml`) define os passos para build e deploy da aplicação.

### Configuração do Deploy

O arquivo `.github/workflows/deploy.yml` contém as seguintes configurações:

* **Gatilhos:** O workflow é acionado em `push` na branch `main` ou manualmente através do `workflow_dispatch`.
* **Permissões:** Define as permissões necessárias para o deploy no GitHub Pages.
* **Jobs:**
    * **`build`:** Responsável por fazer o checkout do código, configurar o Node.js, instalar as dependências, fazer o build da aplicação e fazer o upload do artefato para o GitHub Pages.
    * **`deploy`:** Responsável por fazer o deploy do artefato no ambiente do GitHub Pages.

### Configuração do Vite

O arquivo `vite.config.ts` é configurado para o deploy no GitHub Pages, com o `base` definido como `/ProjetoS05/`. Isso garante que os assets sejam carregados corretamente na URL do GitHub Pages.

## 📦 Dependências

O projeto utiliza as seguintes dependências principais:

* **React:** Biblioteca para construção de interfaces de usuário.
* **React Router DOM:** Para gerenciamento de rotas na aplicação.
* **Framer Motion:** Para animações e transições.
* **Lucide React:** Biblioteca de ícones.
* **Tailwind CSS:** Framework de CSS para estilização.
* **Vite:** Ferramenta de build e desenvolvimento.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **ESLint:** Ferramenta de linting para JavaScript e TypeScript.

Para uma lista completa de dependências, consulte o arquivo `package.json`.
