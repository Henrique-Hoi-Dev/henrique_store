# Henrique Store - Frontend

Frontend do e-commerce construído com Nuxt 3, integrado com microserviços.

## 🚀 Funcionalidades

- **Autenticação Integrada**: Integração completa com o microserviço de autenticação
- **Verificação Automática de Token**: Verificação automática de tokens JWT
- **Middleware de Proteção**: Rotas protegidas com verificação de token
- **Interface Responsiva**: Design moderno e responsivo
- **Internacionalização**: Suporte a português e inglês
- **Gerenciamento de Estado**: Usando Pinia para gerenciamento de estado

## 🔧 Configuração

### Variáveis de Ambiente

Copie o arquivo `env.sample` para `.env` e configure as URLs dos microserviços:

```bash
cp env.sample .env
```

Configure as variáveis no arquivo `.env`:

```env
# Microserviços URLs
AUTH_MS_URL=http://localhost:3001
USER_MS_URL=http://localhost:3002
PRODUCT_MS_URL=http://localhost:3003
SALES_MS_URL=http://localhost:3004
NOTIFICATIONS_MS_URL=http://localhost:3005

# Configurações do frontend
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔐 Autenticação

### Integração com Microserviço

O frontend está totalmente integrado com o microserviço de autenticação (`ms_auth`):

- **Login**: `POST /auth/login`
- **Registro**: `POST /auth/register`
- **Logout**: `POST /auth/logout`
- **Verificação de Token**: `GET /auth/verify-token`

### Verificação Automática de Token

O sistema verifica automaticamente a validade dos tokens:

1. **Plugin de Inicialização**: Verifica token ao carregar a aplicação
2. **Middleware de Rota**: Verifica token em rotas protegidas
3. **Store de Usuário**: Gerencia estado de autenticação

### Rotas Protegidas

- `/admin/*` - Requer autenticação e role de admin
- `/checkout` - Requer autenticação
- `/perfil` - Requer autenticação

## 📁 Estrutura do Projeto

```
henrique_store/
├── components/          # Componentes Vue
├── composables/         # Composables (useAuth, useCart, etc.)
├── middleware/          # Middleware de rota
├── pages/              # Páginas da aplicação
├── plugins/            # Plugins Nuxt
├── server/             # API do servidor
│   ├── api/           # Endpoints da API
│   └── middleware/    # Middleware do servidor
├── stores/            # Stores Pinia
└── utils/             # Utilitários
```

## 🔄 API Endpoints

### Endpoints Públicos

- `POST /api/auth/verify-token` - Verificar token JWT

### Endpoints Protegidos

- `GET /api/protected/user-profile` - Perfil do usuário autenticado

## 🛠️ Desenvolvimento

### Adicionando Novos Endpoints Protegidos

1. Crie o arquivo em `server/api/protected/`
2. O middleware de autenticação será aplicado automaticamente
3. Acesse os dados do usuário via `event.context.user`

### Exemplo de Endpoint Protegido

```javascript
// server/api/protected/example.js
export default defineEventHandler(async (event) => {
  const user = event.context.user;

  return {
    success: true,
    data: {
      message: `Olá ${user.name}!`,
    },
  };
});
```

## 🚀 Deploy

### Docker

```bash
# Build da imagem
docker build -t henrique-store .

# Executar container
docker run -p 3000:3000 henrique-store
```

### Variáveis de Ambiente para Produção

Configure as URLs dos microserviços para o ambiente de produção:

```env
AUTH_MS_URL=https://auth-api.seudominio.com
USER_MS_URL=https://user-api.seudominio.com
PRODUCT_MS_URL=https://product-api.seudominio.com
SALES_MS_URL=https://sales-api.seudominio.com
NOTIFICATIONS_MS_URL=https://notifications-api.seudominio.com
```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
