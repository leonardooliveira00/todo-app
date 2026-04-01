# 🧠 Todo App Frontend

Frontend de uma aplicação de gerenciamento de tarefas (Todo App), desenvolvido com foco em **boas práticas de arquitetura**, **experiência do usuário (UX)** e **código limpo**.

O projeto simula um ambiente próximo ao de aplicações reais, com autenticação, validação, controle de estado e operações completas de CRUD.

---

## 🚀 Tecnologias utilizadas

- **React / Next.js**
- **TypeScript**
- **CSS Modules**
- **Fetch API**
- **Zod** (validação de dados)

---

## 🔐 Autenticação

- Sistema de login funcional
- Autenticação baseada em token (JWT)
- Proteção de rotas (acesso restrito à dashboard)
- Persistência de sessão com `credentials: "include"`

---

## ✅ Funcionalidades implementadas

### 📋 CRUD de tarefas

- Criar tarefa
- Listar tarefas do usuário autenticado
- Editar tarefa
- Deletar tarefa

Tudo funcionando com integração completa ao backend.

---

### 🧾 Formulários

- Formulários para criação e edição via **modais**
- Reaproveitamento de estrutura entre create/edit
- Inputs controlados
- Validação com **Zod**

---

### 🧠 Validação

- Validação no frontend usando schemas
- Feedback visual baseado no estado dos inputs
- Integração com regras já existentes no backend

---

### 🔄 Estado de carregamento (Loading State)

- Controle de carregamento centralizado no componente principal (`TaskPanel`)
- Separação clara entre:
  - Loading
  - Empty State
  - Data Loaded

---

### 🌌 Empty State

- Exibição condicional quando não há tarefas
- Não aparece durante carregamento (evita flicker)
- Abordagem visual minimalista

---

## 🧱 Estrutura do projeto (visão geral)

```
components/
 ├── TaskPanel        # Controle de estado e renderização
 ├── TaskList         # Renderização da lista
 ├── EmptyState       # Estado vazio
 ├── TasksSkeleton    # Loading visual
 ├── Modals           # Create/Edit
services/
 ├── task-service     # Requisições HTTP
schemas/
 ├── validation       # Schemas Zod
```

---

## 🎯 Padrões adotados

- Separação de responsabilidades
- Componentes desacoplados
- Lógica centralizada em componentes "pai"
- UI components focados apenas em renderização
- Reutilização de código sempre que possível

---

## 🚧 Próximas melhorias

### 🎨 UX e Interface

- Refinamento visual da interface
- Melhor uso de cores e hierarquia visual
- Transições mais suaves

---

### ⏳ Loaders e feedback visual

- Skeleton loading para lista de tarefas
- Feedback visual em ações (create/edit/delete)
- Animações para transições de estado
- Remoção de feedback textual (UI mais limpa)

---

### 🔍 Filtros e organização

- Filtro por status (pendente, concluído, etc.)
- Busca por texto
- Ordenação de tarefas

---

## 💡 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

- Simular um fluxo real de aplicação fullstack
- Aplicar boas práticas modernas de frontend
- Construir uma base sólida para evolução futura
- Servir como projeto de portfólio

---

## 📌 Status

🟢 **Em desenvolvimento ativo**

- Core funcional completo ✅
- Melhorias de UX em andamento 🚧

---

## 🧠 Observações finais

O projeto prioriza **clareza de código, escalabilidade e experiência do usuário**, evitando soluções improvisadas e buscando um padrão próximo ao utilizado em aplicações profissionais.

---

Feito com dedicação e evolução contínua 🚀
