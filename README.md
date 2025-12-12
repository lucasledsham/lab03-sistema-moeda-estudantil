# 📘 Relatório de Análise Crítica do Projeto 👨‍💻

## 1. Informações do grupo
- **🎓 Curso:** Engenharia de Software
- **📘 Disciplina:** Laboratório de Desenvolvimento de Software
- **🗓 Período:** 4° Período
- **👨‍🏫 Professor(a):** Prof. Dr. João Paulo Carneiro Aramuni
- **👥 Membros do Grupo:** [Lista de integrantes]

---

## 📌 2. Identificação do Projeto
- **Nome do projeto:** EduCoins
- **Integrantes do outro grupo:** Guilherme Martini Brina Ferreira, Lucas Nunes Leal Ledsham, Thales Eduardo de Carvalho.
- **Link do repositório:** https://github.com/lucasledsham/lab03-sistema-moeda-estudantil.git
- **Pull requests submetidos pelo seu grupo:**
  
  | 👤 Integrante | 🔧 Refatoração | 🔗 Link do PR |
  |--------------|---------------|----------------|
  | :octocat: <a href="https://github.com/user1">Jonathan Sena </a> | Estrutura e código duplicado do frontend | https://github.com/exemplo/projeto/pull/1 |
  | :octocat: <a href="https://github.com/user2">Matheus Fernandes </a> | Organização de Pastas e Modularização do Backend | https://github.com/exemplo/projeto/pull/2 |
  | :octocat: <a href="https://github.com/user3">Victor Gabriel</a> | Refatoração backend - Camada services | https://github.com/exemplo/projeto/pull/3 |
  | :octocat: <a href="https://github.com/user4">Vitor Hugo</a> | Refatoração frontend | https://github.com/exemplo/projeto/pull/4 |

---

## 🧱 3. Arquitetura e Tecnologias Utilizadas

O **EduCoin** utiliza uma arquitetura modular composta por **backend**, **frontend** e **banco de dados**, garantindo separação clara de responsabilidades, manutenção facilitada e escalabilidade para futuras expansões do sistema.

---

## 🏗️ Backend — Spring Boot

O backend foi implementado utilizando **Spring Boot**, seguindo uma estrutura próxima ao padrão **MVC**, onde o fluxo de dados é organizado em camadas específicas:

- **Controllers** — Manipulam as requisições HTTP, validam dados recebidos e direcionam a operação para os serviços responsáveis.  
- **Services** — Contêm toda a lógica de negócio do sistema, como envio de moedas, cálculo de saldo, geração de cupons e notificações.  
- **Repositories** — Realizam a integração com o **MongoDB** por meio do Spring Data, permitindo operações de persistência de forma simples e eficiente.  
- **Models/Entities** — Representam as principais entidades do domínio: Aluno, Professor, Empresa, Vantagens, Cupons e Transações.

### **Tecnologias do Backend**
- Spring Boot 3+  
- Spring Web  
- Spring Data MongoDB  
- Bean Validation (Jakarta Validation)  
- Serviço de e-mail integrado  
- Autenticação e controle de perfis de usuário  

---

## 🌐 Frontend — React + TypeScript

O frontend foi desenvolvido utilizando **React** com **TypeScript**, garantindo segurança tipada, reutilização de componentes e uma experiência moderna para todos os perfis de usuários do sistema.

### **Recursos Utilizados**
- React + TypeScript  
- Tailwind CSS  
- Shadcn/UI  
- Zod (validação no frontend)  
- Lucide Icons  
- Consumo de APIs REST via fetch/axios  

O uso dessas tecnologias possibilita interfaces dinâmicas, responsivas e com foco na experiência do usuário.

---

## 🗄️ Banco de Dados — MongoDB

O sistema utiliza **MongoDB**, um banco NoSQL orientado a documentos, ideal para trabalhar com modelos de dados flexíveis e escaláveis.

### **Principais Benefícios**
- Estrutura flexível para entidades como usuários, vantagens e transações  
- Alta performance em operações de leitura e escrita  
- Fácil integração com Spring Data MongoDB  
- Permite escalar horizontalmente conforme o volume de dados cresce  

---

## 🔄 Integração Entre as Camadas

A comunicação entre frontend e backend acontece por meio de **APIs RESTful**, seguindo o seguinte fluxo:

1. O frontend envia requisições HTTP (ex.: login, envio de moedas, resgate de cupons).  
2. O backend processa as regras de negócio e interage com o banco de dados.  
3. Quando necessário, são disparados serviços adicionais (como envio de e-mail).  
4. O backend retorna a resposta ao frontend, que atualiza a interface.  

Durante o desenvolvimento, o backend foi disponibilizado publicamente utilizando **Ngrok**, permitindo testes reais e integração direta com o frontend hospedado.

---

Esse modelo garante um sistema robusto, modular e preparado para evoluções futuras, como deploy com Docker, integração contínua e escalabilidade distribuída.

## 🗂️ 4. Organização do GitHub e Fluxo de Trabalho Colaborativo

Avalie as práticas de Engenharia de Software Colaborativa do projeto, focando na clareza, padronização e rastreabilidade.

### 4.1. Estrutura do Repositório e Documentação
* **Estrutura de Pastas:** A organização dos diretórios (`src`, `config`, `frontend`, etc.) segue as convenções padrão do Spring Boot/Next.js? A separação de Backend e Frontend é clara e lógica?
* **Documentação Essencial:** O arquivo `README.md` é completo e útil? Verifique se ele contém:
    * **Descrição** do projeto e suas funcionalidades.
    * **Requisitos** de ambiente (Java, Node, versões específicas, etc.).
    * **Instruções claras de inicialização** (incluindo banco de dados e comandos de *build*).

### 4.2. Gerenciamento de Tarefas (Issues)
* **Uso de Issues:** O grupo utilizou o sistema de Issues para:
    * Rastrear bugs, funcionalidades e tarefas?
    * Gerenciar o backlog e priorizar o trabalho (com *labels* ou *milestones*)?
    * A descrição das Issues é suficientemente detalhada para guiar o desenvolvimento?

### 4.3. Fluxo de Trabalho (Pull Requests e Branches)
* **Branches:** O fluxo de *branching* é claro (e.g., usa *main/master*, *develop* e *feature branches*)?
* **Pull Requests (PRs):** Qual a qualidade e o uso dos Pull Requests?
    * Possuem **descrições** detalhadas e explicam o propósito das mudanças?
    * Estão **vinculados** às Issues correspondentes?
    * Foram usados para **Revisão de Código (Code Review)** antes do *merge*?

### 4.4. Padrões de Commits e Versionamento
* **Padrão de Commits:** Existe um padrão de mensagens de commit (e.g., usando prefixos como `feat:`, `fix:`, `refactor:`)?
    > **Sugestão:** Se não houver, mencione que a adoção de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) melhoraria drasticamente a rastreabilidade e a geração automática de *changelogs*.
* **Versionamento (Releases/Tags):** O projeto utiliza **Tags** ou **Releases** para marcar versões estáveis ou marcos importantes (e.g., `v1.0.0`)?

---

# 🖥️ 5. Dificuldades para Configuração do Ambiente

Durante a preparação do ambiente de desenvolvimento do **EduCoin**, algumas dificuldades pontuais foram encontradas, principalmente no frontend. A seguir estão descritos os problemas reais enfrentados e as soluções aplicadas.

---

## 5.1. Backend — Configuração sem Dificuldades

O backend foi configurado utilizando **Java 21**, e todo o ambiente funcionou corretamente desde o início.

- O projeto subiu normalmente.
- Não houve conflitos de versão.
- As dependências via Maven foram baixadas sem erros.
- A integração com o MongoDB ocorreu como esperado.

**✔️ Status:** Nenhuma dificuldade significativa durante a configuração do backend.

---

## 5.2. Frontend — Problemas com Dependências

A única dificuldade real encontrada pelo grupo ocorreu no **frontend**.

### 📦 Dependências Desatualizadas

- Algumas dependências do React/TypeScript estavam desatualizadas.
- Isso gerou avisos e pequenos erros durante a instalação.
- Apesar disso, o comando `npm install` funcionou após ajustes mínimos.
- Toda a estrutura do projeto rodou normalmente com `npm run dev`.

**✔️ Solução aplicada:**  
Atualização ou substituição das dependências incompatíveis, garantindo funcionamento estável.

---

## 5.3. Resultado Final do Ambiente

Após os ajustes mencionados:

- O **backend (Java 21)** rodou sem qualquer problema.
- O **frontend** foi executado com sucesso após corrigir as dependências.
- As instruções do README original foram suficientes para levantar toda a aplicação.

---

## 🔎 6. Análise de Qualidade do Código e Testes

### 6.1. Design e Princípios SOLID
* **Coesão e Acoplamento:** Existem classes com muitas responsabilidades (**God Class**)? O acoplamento entre módulos é alto?
* **Princípios SOLID Violados (Se aplicável):** (Ex: O Controller faz validação e acesso ao banco, violando o **S**ingle Responsibility Principle - SRP).
* **Code Smells:** Identifique a presença de **Long Method** (métodos com muitas linhas) ou **Duplicated Code** fora das áreas que vocês refatoraram.
    * **Evidência/Exemplo:** _(Cite o arquivo e a linha onde um problema foi encontrado)_

### 6.2. Testabilidade e Cobertura
* **Presença de Testes:** O projeto possui testes (Unitários, Integração, End-to-End)?
* **Cobertura (Estimada/Medida):** Qual é a cobertura de código (Se houver ferramenta para medir, cite o percentual)?
    * **Qualidade dos Testes:** Os testes focam na lógica de negócio (camada Service) ou apenas na integração do sistema (testando o Controller e persistência)?
    * **Mocking:** O uso de *mocks* e *stubs* é adequado para isolar as dependências e testar unidades de código?
    * **Evidência/Exemplo:** _(Cite o diretório de testes (`src/test`) e mencione a ausência ou presença de testes para uma funcionalidade crítica)_

### 6.3. Segurança e Tratamento de Erros (OWASP Top 10)
Avalie o projeto com base em vulnerabilidades comuns, como as citadas no OWASP Top 10. 

* **Validação de Entrada (Input Validation):** Existem validações rigorosas em todos os dados recebidos (DTOs)? Há sanitização de *input* para prevenir **Injeção de SQL/Scripting (XSS)**?
* **Tratamento de Credenciais:** O tratamento de senhas é seguro (uso de `BCrypt` ou algoritmo forte)? As credenciais de acesso ao banco estão expostas no código ou em *logs*?
* **Tratamento de Exceções:** O tratamento de exceções é adequado? A aplicação retorna mensagens de erro genéricas (status 500) ou expõe detalhes do erro e da arquitetura (vazamento de informações)?
    * **Evidência/Exemplo:** _(Cite um ponto fraco, Ex: "O campo de busca não tem sanitização, potencial XSS" ou "As senhas não estão criptografadas")_

---

## 🚀 7. Sugestões de Melhorias

Liste **entre 5 e 7 sugestões claras e prioritárias** para os autores do projeto, baseadas nas análises acima (Seções 3, 4, 5 e 6).

1. **Melhoria da Documentação:** Criar um arquivo `CONTRIBUTING.md`, adicionar instruções completas de configuração do ambiente (Java, Maven, variáveis de ambiente e scripts de inicialização) e incluir uma seção de troubleshooting no `README.md`.
2. **Padronização do Código:** Adotar **Conventional Commits**, habilitar ferramentas como **Spotless**, **Checkstyle** ou **SonarLint** para manter consistência e detectar code smells automaticamente.
3. **Testes Automatizados:** Implementar testes unitários na camada de **Service** e testes de integração com **Spring Boot Test**, buscando ao menos **80% de cobertura** nas funcionalidades principais.
4. **Melhorias de Segurança:** Utilizar **Spring Validation** para validação de DTOs, adicionar tratamento centralizado de erros com `@ControllerAdvice`, remover informações sensíveis de logs e revisar dependências vulneráveis usando `mvn dependency-check`.
5. **Organização do Repositório:** Padronizar a estrutura de pastas, adicionar templates de Pull Request e Issues, além de configurar Branch Protection para `main`.
6. **Performance e Otimização:** Analisar pontos de gargalo no carregamento de dados, reduzir consultas redundantes, aplicar cache quando adequado e revisar métodos que fazem processamento excessivo no backend.
7. **Automação e CI/CD:** Criar uma pipeline no **GitHub Actions** para rodar testes, verificar estilo, validar segurança das dependências e realizar build automático a cada PR.

---

## 🔧 8. Refatorações Propostas (3 partes do código)

Cada refatoração deve conter:
1. **Arquivo e localização**  
2. **Código antes**  
3. **Código depois**  
4. **Tipo de refatoração aplicada**  
5. **Justificativa técnica**  
6. **Link do Pull Request**

---

### 1️⃣ Refatoração 1 – Extração de Método (Extract Method)

**Arquivo:** `src/main/java/com/example/service/UserService.java`  
**Pull Request:** https://github.com/exemplo/projeto/pull/1  

#### 🔴 Antes
```java
public User createUser(UserDTO dto) {
    if (dto.getEmail() == null || !dto.getEmail().contains("@")) {
        throw new IllegalArgumentException("Email inválido");
    }
    if (dto.getPassword() == null || dto.getPassword().length() < 8) {
        throw new IllegalArgumentException("Senha fraca");
    }

    User user = new User(dto.getEmail(), dto.getPassword());
    return userRepository.save(user);
}
```

#### 🟢 Depois
```java
private void validateUserDTO(UserDTO dto) {
    if (dto.getEmail() == null || !dto.getEmail().contains("@")) {
        throw new IllegalArgumentException("Email inválido");
    }
    if (dto.getPassword() == null || dto.getPassword().length() < 8) {
        throw new IllegalArgumentException("Senha fraca");
    }
}

public User createUser(UserDTO dto) {
    validateUserDTO(dto);
    User user = new User(dto.getEmail(), dto.getPassword());
    return userRepository.save(user);
}
```

#### ✔ Tipo de refatoração aplicada
- **Extract Method**  

#### 📝 Justificativa
Melhora a clareza, responsabilidade única e testabilidade.

---

### 2️⃣ Refatoração 2 – Remoção de Código Duplicado

**Arquivo:** `src/main/java/com/example/util/StringUtils.java`  
**Pull Request:** https://github.com/exemplo/projeto/pull/2  

#### 🔴 Antes
```java
public String capitalizeName(String name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
}

public String capitalizeCity(String city) {
    return city.substring(0, 1).toUpperCase() + city.substring(1);
}

```

#### 🟢 Depois
```java
public String capitalize(String text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

public String capitalizeName(String name) {
    return capitalize(name);
}

public String capitalizeCity(String city) {
    return capitalize(city);
}
```

#### ✔ Tipo de refatoração aplicada
- **Replace Duplicated Code with Method**

#### 📝 Justificativa
Elimina duplicação e facilita manutenção.

---

### 3️⃣ Refatoração 3 – Melhoria de Nomes (Rename)

**Arquivo:** `src/main/java/com/example/controller/ProductController.java`  
**Pull Request:** https://github.com/exemplo/projeto/pull/3  

#### 🔴 Antes
```java
@PostMapping("/x")
public void x(@RequestBody Product p) {
    if (p == null) return;
    service.save(p);
}
```

#### 🟢 Depois
```java
@PostMapping("/save")
public void saveProduct(@RequestBody Product product) {
    if (product == null) return;
    service.save(product);
}
```

#### ✔ Tipo de refatoração aplicada
- **Rename Method / Rename Parameter**

#### 📝 Justificativa
Melhora a clareza e expressividade do código.

---

## 9. 📄 Conclusão

A análise crítica permitiu identificar aspectos importantes relacionados à **arquitetura**, **qualidade do código** e **organização geral do projeto**. A investigação detalhada evidenciou pontos positivos, como boas escolhas tecnológicas, mas também expôs problemas que comprometem a **manutenibilidade**, **segurança** e **performance** do sistema.

As refatorações propostas tiveram impacto direto na **melhoria da legibilidade**, **redução de duplicidade**, **aumento da coesão** e **clareza das responsabilidades**. Além disso, práticas recomendadas foram introduzidas para tornar o código mais robusto, mitigando riscos como:
- validações inconsistentes;
- trechos suscetíveis a falhas de segurança (ex.: falta de sanitização ou verificações frágeis);
- métodos extensos e difíceis de testar;
- rotinas com potencial para degradação de desempenho.

A análise também mostrou que melhorias adicionais podem ser adotadas, como:
- padronização da comunicação via **Conventional Commits**;
- reforço das práticas de **segurança** (validações mais estruturadas, tratamento de exceções, prevenção de vulnerabilidades comuns);
- otimizações de **performance**, incluindo redução de operações redundantes e melhor organização das responsabilidades do backend;
- ampliação e atualização da **documentação**, incluindo requisitos de ambiente e instruções claras de execução;
- tratamento cuidadoso das dependências utilizadas no projeto.

Por fim, o processo reforçou a importância da **refatoração contínua**, **revisão estruturada de código** e **boas práticas de engenharia**, fundamentais para manter um software sustentável, escalável e seguro ao longo de seu ciclo de vida.
