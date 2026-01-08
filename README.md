# AgilStore - Sistema de Controle de Inventário

Sistema web para gestão de inventário de produtos eletrônicos, desenvolvido com arquitetura cliente-servidor utilizando tecnologias modernas e padrões REST.

## Visão Geral

AgilStore é uma aplicação fullstack que permite o gerenciamento completo de produtos em estoque, incluindo operações de cadastro, consulta, atualização e remoção (CRUD completo). O sistema foi projetado para lojas de eletrônicos, oferecendo controle sobre smartphones, laptops e acessórios.

## Arquitetura da Solução

### Modelo Arquitetural

O projeto segue uma arquitetura **cliente-servidor em três camadas**:

```
┌─────────────────────────────────────────┐
│          Camada de Apresentação         │
│     (Frontend - HTML/CSS/JavaScript)    │
└─────────────────────────────────────────┘
                    │
                    │ HTTP/JSON (REST API)
                    ▼
┌─────────────────────────────────────────┐
│         Camada de Aplicação             │
│       (Backend - Node.js/Express)       │
└─────────────────────────────────────────┘
                    │
                    │ SQL Queries
                    ▼
┌─────────────────────────────────────────┐
│          Camada de Dados                │
│            (MySQL Database)             │
└─────────────────────────────────────────┘
```

### Stack Tecnológico

**Backend:**
- **Node.js**: Runtime JavaScript para servidor
- **Express.js 5.2.1**: Framework web minimalista e flexível
- **MySQL2 3.16.0**: Driver MySQL com suporte a Promises
- **CORS 2.8.5**: Middleware para habilitar requisições cross-origin

**Frontend:**
- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização com layout responsivo usando Grid/Flexbox
- **JavaScript (Vanilla)**: Lógica do cliente sem frameworks adicionais

**Banco de Dados:**
- **MySQL**: Sistema de gerenciamento de banco de dados relacional

## Decisões de Design

### 1. Arquitetura RESTful

**Decisão:** Implementar uma API RESTful completa seguindo convenções HTTP.

**Justificativa:**
- Padrão amplamente adotado e bem documentado
- Facilita manutenção e escalabilidade
- Permite integração com outras aplicações
- Separação clara entre cliente e servidor

**Implementação:**
```
GET    /produtos      - Lista todos os produtos
POST   /produtos      - Cria novo produto
PUT    /produtos/:id  - Atualiza produto existente
DELETE /produtos/:id  - Remove produto
```

### 2. Servidor de Arquivos Estáticos

**Decisão:** Utilizar o mesmo servidor Express para servir o frontend.

**Justificativa:**
- Simplifica o deployment (uma única aplicação)
- Reduz complexidade de configuração
- Adequado para aplicações de pequeno/médio porte
- Facilita desenvolvimento local

### 3. JavaScript Vanilla no Frontend

**Decisão:** Não utilizar frameworks JavaScript (React, Vue, Angular).

**Justificativa:**
- Reduz complexidade e tamanho do bundle
- Elimina dependências desnecessárias
- Adequado para escopo do projeto
- Performance otimizada (sem overhead de framework)
- Facilita compreensão e manutenção

### 4. Queries Parametrizadas

**Decisão:** Utilizar prepared statements com placeholders (`?`).

**Justificativa:**
- **Segurança**: Previne SQL Injection
- **Performance**: MySQL pode otimizar queries parametrizadas
- **Manutenibilidade**: Código mais limpo e legível

**Exemplo:**
```javascript
const sql = "INSERT INTO produtos (nome_do_produto, categoria, quantidade_em_estoque, preco) VALUES (?, ?, ?, ?)";
db.query(sql, [nome_do_produto, categoria, quantidade_em_estoque, preco], callback);
```

### 5. Tratamento de Erros Robusto

**Decisão:** Implementar tratamento de erros em todas as operações críticas.

**Justificativa:**
- Melhora experiência do usuário
- Facilita debugging
- Previne crashes da aplicação

### 6. Interface Responsiva

**Decisão:** Utilizar CSS Grid e Flexbox para layout adaptativo.

**Justificativa:**
- Compatibilidade com diferentes dispositivos
- Não requer bibliotecas CSS externas
- Performance otimizada
- Manutenção simplificada

