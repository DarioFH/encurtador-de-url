# Projeto Encurtador de URLs

## Passo a Passo para Rodar o Projeto

### Requisitos
- Docker
- Docker Compose

### Passos para Execução

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:DarioFH/encurtador-de-url.git
   cd encurtador-de-url
    ```
2. **Execute o comando para construir e subir os containers:**
    ```bash
    docker-compose up --build
    ```
### O que Acontece ao Executar o Comando
O comando acima irá subir dois containers:
- MySQL 8.0: Banco de dados necessário para a aplicação.
- Aplicação NestJS: Contendo a lógica do encurtador de URLs.
### Acesso à Documentação
Após a build e subida dos containers, a documentação da aplicação estará disponível na URL:

http://localhost/swagger



A documentação contém todos os endpoints e exemplos de payload que devem ser utilizados.

### Observações Importantes
A aplicação possui validadores nas requisições. Qualquer requisição que não esteja mapeada na documentação será recusada pela API.

## Versão 1.0
### Funcionalidades Incluídas
- Gerenciamento de Usuário
- Encurtadores de URLs
- Redirecionamento de URLs
#### Possíveis Evoluções
- ####  Testes:

  - Implementação de testes unitários, de integração e end-to-end (e2e) para aumentar a confiabilidade da aplicação.
- #### Logs:

  - Adição de logs para auditorias e monitoramento de atividades dentro do sistema.
- #### Expiração de Links:

  - Implementação de verificação de validade de links e desativar caso necessário.
- #### Microserviços:

  - Evoluir a aplicação para uma arquitetura de microsserviços e utilizar um orquestrador para escalar conforme necessário.