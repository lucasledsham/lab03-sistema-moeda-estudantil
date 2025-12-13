# 📘 Relatório de Análise Crítica do Projeto 👨‍💻

## 1. Informações do grupo
- **🎓 Curso:** Engenharia de Software
- **📘 Disciplina:** Laboratório de Desenvolvimento de Software
- **🗓 Período:** 4° Período
- **👨‍🏫 Professor(a):** Prof. Dr. João Paulo Carneiro Aramuni
- **👥 Membros do Grupo:** [Lista de integrantes]

## 📌 2. Identificação do Projeto
- **Nome do projeto:** EduCoins
- **Integrantes do outro grupo:** Guilherme Martini Brina Ferreira, Lucas Nunes Leal Ledsham, Thales Eduardo de Carvalho.
- **Link do repositório:** https://github.com/lucasledsham/lab03-sistema-moeda-estudantil.git
- **Pull requests submetidos pelo seu grupo:**
  
  | 👤 Integrante | 🔧 Refatoração | 🔗 Link do PR |
  |--------------|---------------|----------------|
  | :octocat: <a href="https://github.com/Js3Silva">Jonathan Sena </a> | Estrutura e código duplicado do frontend | https://github.com/matheus-0063/lab03-sistema-moeda-estudantil/pull/1 |
  | :octocat: <a href="https://github.com/matheus-0063">Matheus Fernandes </a> | Organização de Pastas e Modularização do Backend | https://github.com/exemplo/projeto/pull/2 |
  | :octocat: <a href="https://github.com/Victorgabrielcruz">Victor Gabriel</a> | Refatoração backend - Camada services | https://github.com/exemplo/projeto/pull/3 |
  | :octocat: <a href="https://github.com/VitorHDMarinho">Vitor Hugo</a> | Refatoração frontend | https://github.com/exemplo/projeto/pull/4 |


## 🧱 3. Arquitetura e Tecnologias Utilizadas

O **EduCoin** utiliza uma arquitetura modular composta por **backend**, **frontend** e **banco de dados**, garantindo separação clara de responsabilidades, manutenção facilitada e escalabilidade para futuras expansões do sistema.

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


## 🗄️ Banco de Dados — MongoDB

O sistema utiliza **MongoDB**, um banco NoSQL orientado a documentos, ideal para trabalhar com modelos de dados flexíveis e escaláveis.

### **Principais Benefícios**
- Estrutura flexível para entidades como usuários, vantagens e transações  
- Alta performance em operações de leitura e escrita  
- Fácil integração com Spring Data MongoDB  
- Permite escalar horizontalmente conforme o volume de dados cresce  


## 🔄 Integração Entre as Camadas

A comunicação entre frontend e backend acontece por meio de **APIs RESTful**, seguindo o seguinte fluxo:

1. O frontend envia requisições HTTP (ex.: login, envio de moedas, resgate de cupons).  
2. O backend processa as regras de negócio e interage com o banco de dados.  
3. Quando necessário, são disparados serviços adicionais (como envio de e-mail).  
4. O backend retorna a resposta ao frontend, que atualiza a interface.  

Esse modelo na teoria garante um sistema robusto, porém há uma desorganização estrutural e muito código "mocado". Recomendamos que boa parte seja reorganizada e refeita.
## 🗂️ 4. Organização do GitHub e Fluxo de Trabalho Colaborativo

Esta seção apresenta a avaliação das práticas de Engenharia de Software Colaborativa adotadas no projeto, considerando aspectos de clareza, padronização, organização e rastreabilidade das atividades realizadas no GitHub.

### 4.1. Estrutura do Repositório e Documentação

A estrutura do repositório apresenta pontos positivos e negativos no que se refere à organização das pastas e à padronização adotada.

Em relação aos aspectos positivos, observa-se a separação do projeto em diretórios distintos para front-end, back-end e documentos, o que contribui para uma melhor organização do código e dos artefatos do projeto. A pasta destinada ao front-end segue um padrão comum e adequado, contendo diretórios como `public`, `src` e arquivos de configuração, o que facilita a compreensão e manutenção da aplicação.

Por outro lado, há pontos que podem ser melhorados. A nomenclatura das pastas poderia ser mais padronizada, evitando o uso do caractere "-" nos nomes. Além disso, a pasta de back-end apresenta dois arquivos referentes ao sistema (`sistema-moeda-estudantil`), o que pode gerar confusão quanto à estrutura e à organização correta do código.

No que diz respeito à documentação, o arquivo `README.md` é considerado completo e útil. Ele apresenta uma descrição clara do projeto e de suas funcionalidades, informa os requisitos necessários para execução do sistema e fornece instruções claras de inicialização, incluindo orientações sobre o banco de dados e os comandos de build, facilitando o uso do repositório por novos colaboradores.

### 4.2. Gerenciamento de Tarefas (Issues)

Não foi identificado o uso do recurso de Issues do GitHub pelo grupo. Dessa forma, não houve registro formal de tarefas, bugs ou melhorias por meio dessa funcionalidade, o que limita a rastreabilidade das demandas e o acompanhamento da evolução do projeto.

### 4.3. Fluxo de Trabalho (Branches e Pull Requests)

Em relação às branches, o repositório possui a branch `develop`, porém as demais branches não apresentam uma organização clara ou um padrão bem definido, dificultando a compreensão do fluxo de desenvolvimento adotado.

Quanto ao uso de Pull Requests, foram identificados três PRs no repositório. No entanto, eles não apresentam informações que permitam avaliar aspectos importantes do fluxo colaborativo, como descrições detalhadas explicando o propósito das mudanças realizadas, vinculação com Issues correspondentes ou a utilização do recurso para revisão de código antes da realização do merge.

### 4.4. Padrões de Commits e Versionamento

Não foi identificado um padrão definido para as mensagens de commit utilizadas no projeto, o que compromete a clareza e a rastreabilidade das alterações realizadas ao longo do desenvolvimento. Como melhoria, a adoção do padrão Conventional Commits poderia contribuir significativamente para a organização do histórico de commits e para a geração automática de changelogs.

Em relação ao versionamento, o projeto não utiliza Tags ou Releases no GitHub, não havendo, portanto, um controle formal de versões do sistema ao longo do tempo.


# 🖥️ 5. Dificuldades para Configuração do Ambiente

Durante a preparação do ambiente de desenvolvimento do **EduCoin**, algumas dificuldades pontuais foram encontradas, principalmente no frontend. A seguir estão descritos os problemas reais enfrentados e as soluções aplicadas.

## 5.1. Backend — Configuração sem Dificuldades

O backend foi configurado utilizando **Java 21**, e todo o ambiente funcionou corretamente desde o início.

- O projeto subiu normalmente.
- Não houve conflitos de versão.
- As dependências via Maven foram baixadas sem erros.
- A integração com o MongoDB ocorreu como esperado.

**✔️ Status:** Nenhuma dificuldade significativa durante a configuração do backend.

## 5.2. Frontend — Problemas com Dependências

A única dificuldade real encontrada pelo grupo ocorreu no **frontend**.

### 📦 Dependências Desatualizadas

- Algumas dependências do React/TypeScript estavam desatualizadas.
- Isso gerou avisos e pequenos erros durante a instalação.
- Apesar disso, o comando `npm install` funcionou após ajustes mínimos.
- Toda a estrutura do projeto rodou normalmente com `npm run dev`.

**✔️ Solução aplicada:**  
Atualização ou substituição das dependências incompatíveis, garantindo funcionamento estável.


## 5.3. Resultado Final do Ambiente

Após os ajustes mencionados:

- O **backend (Java 21)** rodou sem qualquer problema.
- O **frontend** foi executado com sucesso após corrigir as dependências.
- As instruções do README original foram suficientes para levantar toda a aplicação.


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
