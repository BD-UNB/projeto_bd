# Projeto de Banco de Dados — UnB Vagas

Um portal unificado para vagas de IC, estágio, monitoria, projetos de extensão e projetos voluntários, permitindo comunicação direta com o 
professor/orientador e no formato de fórum/comentários. O objetivo principal é facilitar o acesso às oportunidades acadêmicas na UnB.

## Ideia do Projeto
O sistema é um portal unificado de oportunidades acadêmicas da UnB (iniciação científica, monitoria, estágios, extensão, voluntariado, eventos, etc.), voltado para alunos, professores e demais servidores.

Seu objetivo principal é centralizar a divulgação de vagas e permitir que alunos se candidatem, conversem com orientadores/responsáveis e acompanhem o andamento das candidaturas, facilitando o acesso às oportunidades e a comunicação.

## Datas Importantes
- [ X ] 05/05: Nomes dos Grupos e o Tema do Projeto
- [ X ] 30/05: Primeira Parte
- [ ] 07/07 ou 09/07: Entrega Final e Apresentação

## 1º Seminário
- [ X ] Introdução  
- [ X ] Modelo de Entidade Relacionamento. **Usando alguma ferramenta de modelagem**.  
- [ X ] Modelo Relacional. **Usando alguma ferramenta de modelagem**.  
- [ X ] O script SQL que gerou o banco de dados  
- [ X ] A indicação do uso de IA.

- Deverá ser entregue em apenas um arquivo `.pdf` contendo todaa essas partes.

## 2º Seminário
- [ X ] Introdução  
- [ X ] Modelo de Entidade Relacionamento. **Usando alguma ferramenta de modelagem.**  
- [ X  ] Modelo Relacional. **Usando alguma ferramenta de modelagem.**  
- [ X ] O script SQL que gerou o banco de dados. 
    - Na implementação  de pelo **menos uma tabela** usar um gerador de chave  primária automástico do SGBD selecionado para o projeto. 
- [ ] **A construção da camada de persistência.** Enviar o link do github com os códigos fontes e um diagrama apresentando como a interface gráfica do programa acessa a camada de persistência.  
- [ ] **Um programa com as funções de CRUD (Create Read Update Delete) para o seu sistema**.   
    - Acessar mais de uma tabela nas mesmas funções CRUD para garantir integridade referencial. 
- [ ] Utilização de pelo menos uma *View*.  
- [ ] Utilização de pelo menos uma *Procedure*.  
- [ ] Utilização de pelo menos um *Trigger*.  
- [ ] Inserção de um dado binário no banco, pode ser foto, arquivo PDF ou outro tipo de arquivo.  
- [ ] A indicação do uso de IA.
- [ X ] No início do PDF informar o endereço do github no início do projeto.

- Deverá ser entregue em apenas um arquivo `.pdf` contendo todas essas partes.

> [!NOTE] 
> 
> Tem que colocar no GitHub: O script SQL que gerou o banco de dados e Todos os códigos do projeto.

## Estrutura
 
```plaintext
📂 projeto-unb-vagas/ 
├── 📂 api/
│   ├── 📂 tests/
│   ├── 📄 Dockerfile 
│   └── 📄 requirements.txt 
├── 📂 database/
│   ├── 📄 script.sql
│   ├── 📄 views.sql
│   ├── 📄 procedures.sql
│   └── 📄 triggers.sql
├── 📂 docs/
│   └── diagramas, PDFs, etc.
├── 📂 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   ├── 📄 Dockerfile
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   ├── 📄 README.md
│   └── 📄 vite.config.js
├── 📄 .env
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 docker-compose.yml   
└── 📄 README.md
```

## Tecnologias Utilizadas

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Banco de Dados:** MySQL 8.0
- **Infraestrutura:** Docker e Docker Compose

## Como Executar ?

### Pré-requisitos
- [Docker](https://www.docker.com/products/docker-desktop/) instalado

### Passo a passo

1. Clone o repositório
```bash
git clone https://github.com/BD-UNB/projeto_bd.git
cd projeto_bd
```

2. Copie o arquivo de variáveis de ambiente
```bash
cp .env.example .env
```

3. Suba os containers
```
docker compose up --build
```

4. Acesse:
   - Frontend: http://localhost:5173
   - API:      http://localhost:8000/docs
   - Banco:    localhost:3306

### Comandos úteis

Parar os containers preservando os dados do banco:
```bash
docker compose stop
```

Parar e remover os containers (dados do banco preservados):
```bash
docker compose down
```

Recriar o banco do zero após alterações no `script.sql`:
```bash
docker compose down -v
docker compose up --build
```
