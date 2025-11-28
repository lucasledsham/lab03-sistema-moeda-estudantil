# 🪙 **EduCoin — Sistema de Mérito Estudantil com Moeda Virtual**

<a href="https://classroom.github.com/online_ide?assignment_repo_id=99999999&assignment_repo_type=AssignmentRepo"><img src="https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg" width="200"/></a>
<a href="https://classroom.github.com/open-in-codespaces?assignment_repo_id=99999999"><img src="https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg" width="250"/></a>

---

> [!NOTE]
> O **EduCoin** é um sistema de reconhecimento acadêmico baseado em **moeda virtual** distribuída por professores a estudantes, que podem trocá-la por benefícios e produtos em empresas parceiras.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        O <b>EduCoin</b> promove o engajamento estudantil por meio de um sistema de <i>gamificação acadêmica</i>, onde professores recompensam alunos com moedas digitais — trocáveis por vantagens reais disponibilizadas por empresas. Este README segue um template profissional recomendado pelo <a href="https://github.com/joaopauloaramuni">Prof. Dr. João Paulo Aramuni</a>, assegurando documentação clara, organizada e padronizada.
      </div>
    </td>
    <td>
      <div>
        <img src="https://joaopauloaramuni.github.io/image/logo_ES_vertical.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr>
</table>

---

# 🚧 **Status do Projeto**

[![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue)]()
![React](https://img.shields.io/badge/React-Typescript-007ec6?style=for-the-badge&logo=react&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0+-007ec6?style=for-the-badge&logo=springboot&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-007ec6?style=for-the-badge&logo=mongodb&logoColor=white)

---

# 📚 **Índice**

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autores](#-autores)
- [Agradecimentos](#-agradecimentos)
- [Licenca](#-licenca)

---

# 🔗 **Links Úteis**

* 🌐 **Aplicação Web:** https://ayaan-hypergenetic-doloris.ngrok-free.dev/login

---

# 📝 **Sobre o Projeto**

O **EduCoin** foi criado para resolver a falta de mecanismos claros de **reconhecimento e incentivo acadêmico** dentro das instituições de ensino.  

Com ele:

- Professores premiam os alunos com moedas virtuais.
- Alunos podem trocar moedas por benefícios reais.
- Empresas parceiras ganham visibilidade e tráfego.
- A instituição incentiva o engajamento de forma moderna.

O sistema é aplicável em escolas, faculdades, cursos livres e treinamentos corporativos.

---

# ✨ **Funcionalidades Principais**

### 👨‍🎓 **Alunos**
- Cadastro completo  
- Recebimento de moedas  
- Notificação por e-mail  
- Extrato e histórico de moedas  
- Resgate de vantagens (produtos, serviços, descontos)  
- Recebimento de cupom com código único  

### 👩‍🏫 **Professores**
- Pré-cadastrados pela instituição  
- 1.000 moedas/semestre (acumulativas)  
- Envio de moedas com mensagem obrigatória  
- Controle de saldo e extratos  

### 🏢 **Empresas Parceiras**
- Cadastro da empresa  
- Cadastro de vantagens (com foto e custo)  
- Notificação por e-mail quando um cupom é resgatado  

### 🏫 **Instituições**
- Cadastro prévio  
- Gestão de professores  

### 🔐 **Autenticação**
- Login/senha para todos os usuários  
- Controle de acesso por tipo de perfil  

---

# 🛠 **Tecnologias Utilizadas**

## 💻 Front-end
- **React**  
- **TypeScript**  
- **Shadcn/UI**  
- **Tailwind CSS**  
- **Zod**  
- **Lucide Icons**  

## 🖥 Back-end
- **Spring Boot (Java)**  
- API REST com validação e autenticação  

## 🗄 Banco de Dados
- **MongoDB** (NoSQL)

---

# 🏗 **Arquitetura**

Arquitetura cliente–servidor composta por:

- **Frontend React**  
- **API REST em Spring Boot**  
- **MongoDB** como banco de dados documental  

### Fluxo Simplificado

1. Professor envia moedas ao aluno.  
2. Backend valida saldo e registra transação.  
3. Email é enviado automaticamente.  
4. Aluno resgata uma vantagem.  
5. Empresa recebe código de confirmação do cupom.  

---

# 🔧 **Instalação e Execução**

## Clonar o repositório

```bash
git clone https://github.com/lucasledsham/lab03-sistema-moeda-estudantil.git
```

## 🔧 Backend

```bash
cd lab03-sistema-moeda-estudantil/back-end/sistema-moeda-estudantil
mvn spring-boot:run
```


## 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

# 🚀 **Deploy**

Foi utilizado o Ngrok para realizar o deploy da aplicação.
Link: https://ayaan-hypergenetic-doloris.ngrok-free.dev/login

# 📂 **Estrutura de Pastas**

```
├── .editorconfig                # ✍️ Padronização de estilo de código.
├── .env.example                 # 🧩 Exemplo de TODAS as variáveis necessárias (sem valores sensíveis).
├── .gitignore                   # 🧹 Ignora arquivos/pastas não versionadas (.env, node_modules, target, etc.).
├── .vscode/                     # ⚙️ Configurações de ambiente da IDE (opcional).
├── .github/                     # 🤖 CI/CD (Actions), templates de Issues e Pull Requests.
├── README.md                    # 📘 Documentação principal do projeto.
├── CONTRIBUTING.md              # 🤝 Guia de contribuição.
├── LICENSE                      # ⚖️ Licença do projeto.
├── docker-compose.yml           # 🐳 Orquestração dos containers (front/back/db/etc).
│
├── /frontend                    # 📁 Aplicação Frontend
│   ├── /src                     # 📂 Código-fonte React
│   ├── /public                  # 🌐 Arquivos públicos e index.html
│   ├── package.json             # 📦 Dependências e scripts do projeto
│
├── /backend                     # 🔧 API Spring Boot
│   ├── .env.example             # 🧩 Variáveis de ambiente do Back-end.
│   │
│   ├── /src/main/java           # 📂 Código-fonte Java
│   │   └── /com/exemplo/app
│   │       ├── /controller      # 🎮 Endpoints REST.
│   │       ├── /service         # ⚙️ Regras e lógica de negócio.
│   │       ├── /repository      # 🗄️ Repositórios (JPA/Hibernate).
│   │       ├── /model           # 🧬 Entidades persistentes (JPA).
│   │
│   ├── /src/main/resources      # 📂 Recursos do Spring Boot
│   │   ├── application.yml         # ⚙️ Configuração principal da aplicação
│   │   ├── application-dev.yml     # 🧪 Configurações específicas do ambiente de DESENVOLVIMENTO
│   │   ├── application-prod.yml    # 🚀 Configurações específicas para PRODUÇÃO
│   │   ├── application-test.yml    # 🧪 Configurações usadas nos testes automatizados
│   │   ├── /static                # 🌐 Arquivos estáticos (HTML/CSS/JS).
│   │
│
├── /docs                         # 📚 Documentação, arquitetura, modelos C4, Swagger/OpenAPI.
```

---

# 👤 **Autores**

Guilherme Martini Brina Ferreira
Estudante de Engenharia de Software — PUC Minas

Lucas Nunes Leal Ledsham
Estudante de Engenharia de Software — PUC Minas

Thales Eduardo de Carvalho Mattos
Estudante de Engenharia de Software — PUC Minas

# 🙏 **Agradecimentos**

PUC Minas – Engenharia de Software

Prof. Dr. João Paulo Aramuni

# 📄 **Licença**

Este projeto está sob a licença MIT.
