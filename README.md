# 💰 EduCoin - Sistema de Mérito Estudantil com Moeda Virtual

## 🧩 Descrição do Projeto

O **EduCoin** tem como objetivo **estimular o reconhecimento do desempenho acadêmico** através da utilização de uma **moeda virtual**.  
Professores podem distribuir moedas a seus alunos como forma de reconhecimento por bom comportamento, participação ou desempenho, e os alunos podem trocá-las por produtos ou descontos em **empresas parceiras**.

---

## 🚀 Funcionalidades Principais

### 👨‍🎓 Alunos
- Cadastro com informações pessoais (nome, e-mail, CPF, RG, endereço, instituição de ensino e curso);
- Recebimento de moedas enviadas pelos professores;
- Notificação por e-mail ao receber moedas;
- Consulta de extrato e saldo de moedas;
- Troca de moedas por vantagens (descontos, produtos, benefícios);
- Recebimento de cupom digital via e-mail com código de validação.

### 👩‍🏫 Professores
- Pré-cadastrados pela instituição parceira;
- Cada professor recebe **1.000 moedas por semestre**, acumuláveis;
- Envio de moedas a alunos com **mensagem obrigatória de reconhecimento**;
- Consulta de extrato de envio e saldo de moedas;
- Associação a uma instituição e departamento.

### 🏢 Empresas Parceiras
- Cadastro com informações da empresa;
- Cadastro de **vantagens** (produtos, serviços ou descontos) com:
  - Descrição,
  - Foto do produto,
  - Custo em moedas;
- Recebimento de e-mail de confirmação quando um aluno resgata uma vantagem, incluindo código de validação.

### 🏫 Instituições de Ensino
- Pré-cadastradas no sistema;
- Responsáveis por fornecer a lista de professores parceiros.

### 🔐 Autenticação
- Todos os tipos de usuários (alunos, professores e empresas) possuem **login e senha**;
- O sistema exige **autenticação** para acessar as funcionalidades.

---

## ⚙️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias modernas e bastante utilizadas, garantindo performance e uma boa experiência de usuário.

### 🖥️ Frontend
- **React** – Biblioteca JavaScript para construção de interfaces dinâmicas e reativas.  
- **TypeScript** – Superset de JavaScript que adiciona tipagem estática e maior segurança no código.  
- **Shadcn/UI** – Biblioteca de componentes estilizados e acessíveis, integrada ao Tailwind CSS.  
- **Tailwind CSS** – Framework utilitário para estilização rápida e responsiva.  
- **Zod** – Biblioteca de validação de dados e schemas, utilizada em formulários e integração com APIs.  
- **Lucide Icons** – Conjunto moderno de ícones SVG leves e personalizáveis.

### ⚙️ Backend
- **Spring Boot** – Framework Java para criação de APIs robustas e escaláveis, com injeção de dependência e configuração simplificada.

### 🗄️ Banco de Dados
- **MongoDB** – Banco de dados NoSQL orientado a documentos, ideal para armazenar dados flexíveis e de rápida consulta.

---

## 📩 Fluxos Principais do Sistema

### 1. Cadastro de Usuários
- Aluno e empresa realizam cadastro diretamente no sistema.
- Professores e instituições são pré-cadastrados.

### 2. Distribuição de Moedas
- Professor seleciona aluno, define quantidade e motivo.
- Sistema valida saldo e registra a transação.
- Aluno recebe e-mail de notificação.

### 3. Resgate de Vantagens
- Aluno escolhe uma vantagem disponível.
- Sistema verifica saldo e realiza o desconto.
- Gera um **cupom com código de confirmação**.
- Envia e-mails ao aluno e à empresa parceira.

---

## 🛠️ Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/lucasledsham/lab03-sistema-moeda-estudantil.git

# Acessar o diretório do backend
cd lab03-sistema-moeda-estudantil/back-end/sistema-moeda-estudantil

# Configurar o arquivo de propriedades

# Compilar e executar o projeto
mvn spring-boot:run
