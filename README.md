# Eventix - Sistema de Vendas de Ingressos

Este projeto consiste em uma plataforma para gestão e venda de ingressos, construída sobre uma arquitetura de microsserviços. O sistema foi desenvolvido como parte das atividades da disciplina de Sistemas Web 2.

## Estrutura do projeto

Os componentes principais do sistema estão localizados no diretório `Codes/tickets/`:

*   **sales**: Gerencia o ciclo de vida de eventos e o processamento de vendas de ingressos.
*   **users**: Responsável pelo cadastro de usuários e mecanismos de autenticação.
*   **payment**: Processa as operações financeiras e integrações de pagamento.
*   **gateway**: Atua como o ponto central de entrada, roteando as requisições para os serviços apropriados.
*   **nameserver**: Servidor de descoberta (Eureka) que permite a comunicação dinâmica entre os microsserviços.
*   **frontend**: Painel administrativo desenvolvido para facilitar a gestão de eventos e acompanhamento de vendas.
*   **docker**: Contém toda a infraestrutura necessária para rodar o ambiente, incluindo bancos de dados e ferramentas de suporte.

## Como executar o ambiente

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose devidamente configurados em sua máquina.

### Execução

1. Acesse o diretório de infraestrutura:
   ```bash
   cd Codes/tickets/docker
   ```

2. Inicie os serviços utilizando o arquivo de configuração de desenvolvimento:
   ```bash
   docker-compose -f docker-compose-dev.yml up -d --build
   ```

3. Inicie o frontend acessando o diretório
   ````cd Codes/tickers/frontend´´´´

4. Execute o comando abaixo
   ```npm install
   npm run dev´´´

### Endereços das aplicações

Após a inicialização, você poderá acessar os serviços nos seguintes endereços:

*   **Interface Administrativa**: [http://localhost:5174](http://localhost:5173)
*   **API Gateway**: [http://localhost:8080](http://localhost:8080)

## Documentação técnica

Para detalhes sobre as rotas disponíveis, parâmetros e exemplos de uso da API, consulte o arquivo `Codes/tickets/endpoints.md`.

## Tecnologias utilizadas

*   **Backend**: Java 21 com Spring Boot 3.2.x, JPA/Hibernate e PostgreSQL.
*   **Infraestrutura e Gateway**: Spring Cloud Gateway e Eureka Service Discovery.
*   **Interface do Usuário**: React 18, Vite e CSS customizado para uma experiência moderna.
*   **Containerização**: Docker e Docker Compose.



