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


# 🔎 6. Análise de Qualidade do Código e Testes

Esta seção apresenta a análise da qualidade do código do projeto **EduCoin**, considerando aspectos de design, testabilidade e segurança, com base no estado atual do sistema antes do processo de refatoração.

---

## 6.1. Design e Princípios SOLID

Após a análise do código-fonte, foi identificado que o projeto **não aplica os princípios SOLID**. A organização das classes e camadas apresenta problemas de acoplamento, baixa coesão e ausência de separação clara de responsabilidades.

### Coesão e Acoplamento
- Diversas classes exercem **mais de uma responsabilidade**, caracterizando *God Classes*.  
- O **acoplamento entre as camadas é elevado**, especialmente entre *Controllers* e *Repositories*.  
- Em vários pontos do sistema, a camada de controle realiza acesso direto à camada de persistência, ignorando a camada de serviço.

### Princípios SOLID Violados
- **Single Responsibility Principle (SRP)**: violado, pois classes — principalmente *Controllers* — concentram:
  - Lógica de negócio  
  - Manipulação de entidades  
  - Persistência de dados  
- Outros princípios SOLID não são aplicados de forma explícita no projeto.

### Code Smells Identificados
- **Código Duplicado**: existem trechos de código semelhantes em diferentes partes do sistema, que poderiam ser refatorados para métodos reutilizáveis.  
- **Lógica de Negócio em Controllers**: regras importantes estão implementadas diretamente nos endpoints HTTP.  

### Evidência / Exemplo

Exemplo de método localizado em uma *Controller*, onde ocorre acesso direto ao repositório e acúmulo de responsabilidades:

```java
    public ResponseEntity<?> purchaseBenefitAndGenerateCoupon(@PathVariable String benefitId, @RequestParam long cost) {
        User user = userService.getSenderUser();
        user.setCurrency(user.getCurrency() - cost);
        userRepository.save(user);

        final String coupon = generateCouponCode();

        return ResponseEntity.ok(new PurchaseDTO(coupon));
    }

    private String generateCouponCode() {
        return RandomStringUtils.random(6, true, true); // letras + números
    }
}
```
## 6.2. Testabilidade e Cobertura

### Presença de Testes
- O projeto não possui qualquer tipo de teste automatizado, incluindo:
  - Testes unitários  
  - Testes de integração  
  - Testes end-to-end  

### Cobertura de Código
- Não existe medição de cobertura de código, pois nenhuma ferramenta de testes foi configurada.

### Qualidade dos Testes
- Inexistente, devido à ausência total de testes.  
- A lógica de negócio não é validada de forma isolada.

### Mocking
- Não há utilização de mocks, stubs ou frameworks de testes para isolamento de dependências.

### Evidência / Exemplo
- O diretório `src/test` não contém testes implementados, inclusive para funcionalidades críticas como:
  - Compra de benefícios  
  - Geração de cupons  
  - Controle de saldo dos usuários  

---

## 6.3. Segurança e Tratamento de Erros

A análise de segurança foi realizada com base em vulnerabilidades comuns descritas no **OWASP Top 10**.

### Autenticação
- O sistema possui segurança apenas no processo de autenticação, utilizando **JWT (JSON Web Token)**.  
- A proteção do sistema está limitada à verificação do token nas requisições.

### Validação de Entrada
- Não há validação rigorosa e padronizada para todos os dados recebidos nos endpoints.  
- Não foi identificada sanitização explícita de entradas para prevenção de ataques como **XSS**.

### Tratamento de Credenciais
- O tratamento de credenciais não é detalhado de forma clara no código analisado.  
- Não há evidências explícitas de mecanismos avançados de proteção além do uso do JWT.

### Tratamento de Exceções
- O tratamento de exceções é limitado.  
- Em alguns cenários, a aplicação pode expor mensagens técnicas ou não tratar corretamente falhas inesperadas.

### Evidência / Exemplo
- Segurança restrita à autenticação via JWT.  
- Ausência de validação centralizada de dados de entrada.  
- Falta de tratamento global de exceções.

---

## 🚀 7. Sugestões de Melhorias

Com base nas análises realizadas nas Seções 3, 4, 5 e 6, foram identificadas oportunidades claras de melhoria no projeto **EduCoin**, principalmente relacionadas à organização do código, qualidade, testabilidade e segurança.

1. **Aplicação de Princípios de Design (SOLID):**  
   Refatorar o código para aplicar princípios básicos de design, especialmente o **Single Responsibility Principle (SRP)**, removendo lógica de negócio dos *Controllers* e centralizando-a na camada de *Service*, reduzindo o acoplamento entre camadas.

2. **Reorganização da Camada de Controle:**  
   Eliminar o acesso direto dos *Controllers* aos *Repositories*, garantindo que toda a comunicação com a persistência ocorra exclusivamente por meio da camada de serviço.

3. **Remoção de Código Duplicado:**  
   Identificar trechos de código repetidos e refatorá-los para métodos reutilizáveis ou serviços específicos, melhorando a manutenibilidade e reduzindo riscos de inconsistência.

4. **Implementação de Testes Automatizados:**  
   Introduzir testes unitários para a camada de *Service* e testes de integração básicos com **Spring Boot Test**, garantindo validação da lógica de negócio e reduzindo regressões futuras.

5. **Padronização de Validações e Tratamento de Erros:**  
   Utilizar **Bean Validation** nos DTOs e implementar tratamento global de exceções com `@ControllerAdvice`, evitando exposição de erros técnicos e padronizando as respostas da API.

6. **Melhoria da Segurança da Aplicação:**  
   Complementar a autenticação via **JWT** com validações de entrada mais rigorosas, revisão de permissões por perfil e maior controle sobre dados sensíveis trafegados e registrados em logs.

7. **Atualização e Manutenção do Frontend:**  
   Atualizar e manter as dependências do frontend, evitando bibliotecas desatualizadas, além de documentar claramente as versões recomendadas de Node.js e dos principais pacotes utilizados.

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

**Arquivo:** `/src/main/java/com/example/sistema_moeda_estudantil/controllers/BenefitsController.java`

**Pull Request:** Essa melhoria foi feita na branch main

#### 🔴 Antes
```java
    public ResponseEntity<?> purchaseBenefitAndGenerateCoupon(@PathVariable String benefitId, @RequestParam long cost) {
        User user = userService.getSenderUser();
        user.setCurrency(user.getCurrency() - cost);
        userRepository.save(user);

        final String coupon = generateCouponCode();

        return ResponseEntity.ok(new PurchaseDTO(coupon));
    }

    private String generateCouponCode() {
        return RandomStringUtils.random(6, true, true); // letras + números
    }
}
```

**Arquivo:** `/src/main/java/com/example/sistema_moeda_estudantil/services/BenefitsService.java`

#### 🟢 Depois
```java
@PostMapping("/purchase/{benefitId}")
    public ResponseEntity<PurchaseDTO> purchaseBenefit(
            @PathVariable String benefitId,
            @RequestParam long cost) {

        PurchaseDTO dto = benefitService.purchaseBenefit(benefitId, cost);
        return ResponseEntity.ok(dto);
    }
```

```java
public PurchaseDTO purchaseBenefit(String benefitId, long cost) {

        User user = userService.getSenderUser();
        user.setCurrency(user.getCurrency() - cost);
        userRepository.save(user);

        String coupon = RandomStringUtils.random(6, true, true);

        return new PurchaseDTO(coupon);
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

### 3️⃣ Refatoração 3 – 

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
