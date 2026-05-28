# Projeto de Banco de Dados

**Tema:** Qualquer banco de dados que possa ser utilizado para facilitar a vida acadêmica na UnB. 
- Pode ser para auxiliar os professores, alunos, reitoria, comunicação com a sociedade.  

## Ideia do Projeto
Um portal unificado para vagas de IC, estágio, monitoria, projetos de extensão, projetos voluntários que permitiria comunicação direta com o professor/orientador e no formato de fórum/comentários, a principal objetivo seria facilitar o acesso às oportunidades acadêmicas.

O sistema é um portal unificado de oportunidades acadêmicas da UnB (iniciação científica, monitoria, estágios, extensão, voluntariado, eventos, etc.), voltado para alunos, professores e demais servidores.

Seu objetivo principal é centralizar a divulgação de vagas e permitir que alunos se candidatem, conversem com orientadores/responsáveis e acompanhem o andamento das candidaturas, facilitando o acesso às oportunidades e a comunicação.

## Datas Importantes
- [ ] 05/05: Nomes dos Grupos e o Tema do Projeto
- [ ] 30/05: Primeira Parte
- [ ] 30/06 ou 02/07: Entrega Final e Apresentação

## 1º Seminário
- [ X ] Introdução  
- [ ] Modelo de Entidade Relacionamento. **Usando alguma ferramenta de modelagem**.  
- [ ] Modelo Relacional. **Usando alguma ferramenta de modelagem**.  
- [ ] O script SQL que gerou o banco de dados  
- [ ] A indicação do uso de IA.

- Deverá ser entregue em apenas um arquivo `.pdf` contendo todaa essas partes.

## 2º Seminário
- [ ] Introdução  
- [ ] Modelo de Entidade Relacionamento. **Usando alguma ferramenta de modelagem.**  
- [ ] Modelo Relacional. **Usando alguma ferramenta de modelagem.**  
- [ ] O script SQL que gerou o banco de dados. 
    - Na implementação  de pelo **menos uma tabela** usar um gerador de chave  primária automástico do SGBD selecionado para o projeto. 
- [ ] **A construção da camada de persistência.** Enviar o link do github com os códigos fontes e um diagrama apresentando como a interface gráfica do programa acessa a camada de persistência.  
- [ ] **Um programa com as funções de CRUD (Create Read Update Delete) para o seu sistema**.   
    - Acessar mais de uma tabela nas mesmas funções CRUD para garantir integridade referencial. 
- [ ] Utilização de pelo menos uma *View*.  
- [ ] Utilização de pelo menos uma *Procedure*.  
- [ ] Utilização de pelo menos um *Trigger*.  
- [ ] Inserção de um dado binário no banco, pode ser foto, arquivo PDF ou outro tipo 
de arquivo.  
- [ ] A indicação do uso de IA.
- [ ] No início do PDF informar o endereço do github no início do projeto.

- Deverá ser entregue em apenas um arquivo `.pdf` contendo todas essas partes.

> [!NOTE] 
> 
> Tem que colocar no GitHub: O script SQL que gerou o banco de dados e Todos os códigos do projeto.

## Estrutura
 
```plaintext
📂 projeto-unb-vagas/ 
├── 📂 database/
│   ├── 📄 script.sql
│   ├── 📄 views.sql
│   ├── 📄 procedures.sql
│   └── 📄 triggers.sql
├── 📂 backend/
│   ├── src/
│   │   ├── controllers/    # lógica de cada rota
│   │   ├── models/         # representações das entidades
│   │   ├── repositories/   # camada de persistência — queries SQL diretas
│   │   ├── routes/         # definição das rotas e ligação com controllers
│   │   ├── services/       # regras de negócio (candidatura, notificações, etc.)
│   │   └── app.js
│   └── package.json
├── 📂 frontend/
│   └── ...
├── 📂 docs/
│   └── diagramas, PDFs, etc.
└── 📄 README.md
```
