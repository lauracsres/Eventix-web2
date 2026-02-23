# Documentação de Endpoints - Eventix

Esta documentação detalha todas as rotas disponíveis no sistema, organizadas por serviço. Todas as requisições devem ser feitas preferencialmente através do API Gateway (porta 8080).

## Usuários (/api/users)

Interface para gestão de perfis de usuários no sistema.

### Listar todos os usuários
*   **Método:** `GET`
*   **Rota:** `/api/users`
*   **Descrição:** Retorna uma lista com todos os usuários cadastrados.

### Criar novo usuário
*   **Método:** `POST`
*   **Rota:** `/api/users`
*   **Payload de Exemplo:**
    ```json
    {
      "name": "Maria Silva",
      "email": "maria.silva@exemplo.com"
    }
    ```

### Buscar usuário por ID
*   **Método:** `GET`
*   **Rota:** `/api/users/{id}`

### Atualizar dados do usuário
*   **Método:** `PUT`
*   **Rota:** `/api/users/{id}`
*   **Payload de Exemplo:**
    ```json
    {
      "name": "Maria Silva Santos",
      "email": "maria.santos@exemplo.com"
    }
    ```

---

## Tipos de Eventos (/api/event-types)

Gerenciamento das categorias de eventos disponíveis (ex: Show, Teatro, Palestra).

### Listar todos os tipos
*   **Método:** `GET`
*   **Rota:** `/api/event-types`

### Criar novo tipo
*   **Método:** `POST`
*   **Rota:** `/api/event-types`
*   **Payload de Exemplo:**
    ```json
    {
      "name": "Show de Rock"
    }
    ```

---

## Eventos (/api/events)

Gerenciamento das informações dos eventos e datas de vendas.

### Listar todos os eventos
*   **Método:** `GET`
*   **Rota:** `/api/events`

### Criar novo evento
*   **Método:** `POST`
*   **Rota:** `/api/events`
*   **Payload de Exemplo:**
    ```json
    {
      "description": "Festival de Verão",
      "eventTypeId": "uuid-do-tipo",
      "date": "2024-12-20T20:00:00",
      "startSales": "2024-10-01T08:00:00",
      "endSales": "2024-12-19T23:59:59",
      "price": 250.00
    }
    ```

### Buscar evento por ID
*   **Método:** `GET`
*   **Rota:** `/api/events/{id}`

---

## Vendas (/api/sales)

Processamento de pedidos e controle de status de pagamentos.

### Listar todas as vendas
*   **Método:** `GET`
*   **Rota:** `/api/sales`

### Registrar nova venda
*   **Método:** `POST`
*   **Rota:** `/api/sales`
*   **Payload de Exemplo:**
    ```json
    {
      "userId": "uuid-do-usuario",
      "eventId": "uuid-do-evento",
      "saleStatus": "EM_ABERTO"
    }
    ```

### Atualizar status de uma venda
*   **Método:** `PUT`
*   **Rota:** `/api/sales/{id}/status`
*   **Descrição:** Utilizado para confirmar pagamentos ou cancelar pedidos.
*   **Payload de Exemplo:**
    ```json
    {
      "saleStatus": "PAGO"
    }
    ```
