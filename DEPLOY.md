# Guia de Deploy - Henrique Store

Este documento contém instruções para configurar deploy automático no Vercel e Railway com CI/CD.

## 🚀 Deploy no Vercel

### 1. Configuração Inicial

1. Conecte seu repositório ao Vercel:
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório do GitHub
   - Configure as variáveis de ambiente

### 2. Variáveis de Ambiente (Vercel)

Configure as seguintes variáveis no painel do Vercel:

```bash
# Obrigatórias
MERCADO_PAGO_ACCESS_TOKEN=your_mercadopago_token
MERCADO_PAGO_WEBHOOK_URL=https://your-domain.vercel.app/api/webhook
API_BASE_URL=https://your-domain.vercel.app

# Opcionais
NODE_ENV=production
```

### 3. Secrets do GitHub (para CI/CD)

Adicione os seguintes secrets no seu repositório GitHub:

- `VERCEL_TOKEN`: Token de API do Vercel
- `VERCEL_ORG_ID`: ID da organização
- `VERCEL_PROJECT_ID`: ID do projeto
- `MERCADO_PAGO_ACCESS_TOKEN`: Token do Mercado Pago
- `MERCADO_PAGO_WEBHOOK_URL`: URL do webhook
- `API_BASE_URL`: URL base da API

### 4. Obter Tokens do Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Obter tokens
vercel whoami
```

## 🚂 Deploy no Railway

### 1. Configuração Inicial

1. Conecte seu repositório ao Railway:
   - Acesse [railway.app](https://railway.app)
   - Importe o repositório do GitHub
   - Configure as variáveis de ambiente

### 2. Variáveis de Ambiente (Railway)

Configure as seguintes variáveis no painel do Railway:

```bash
# Obrigatórias
MERCADO_PAGO_ACCESS_TOKEN=your_mercadopago_token
MERCADO_PAGO_WEBHOOK_URL=https://your-domain.railway.app/api/webhook
API_BASE_URL=https://your-domain.railway.app

# Opcionais
NODE_ENV=production
PORT=3000
```

### 3. Secrets do GitHub (para CI/CD)

Adicione os seguintes secrets no seu repositório GitHub:

- `RAILWAY_TOKEN`: Token de API do Railway
- `RAILWAY_SERVICE`: Nome do serviço no Railway

### 4. Obter Tokens do Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Obter tokens
railway whoami
```

## 🔄 CI/CD Pipeline

O projeto está configurado com GitHub Actions para:

### Verificações Automáticas

- ✅ Linting (ESLint)
- ✅ Type checking
- ✅ Testes unitários
- ✅ Build da aplicação

### Deploy Automático

- Deploy no Vercel/Railway apenas após aprovação dos testes
- Deploy apenas na branch main/master
- Rollback automático em caso de falha

## 📊 Monitoramento

### Health Check

- Endpoint: `/api/health`
- Verifica status da aplicação
- Monitora uso de memória
- Valida variáveis de ambiente

### Logs

- Vercel: Logs automáticos no painel
- Railway: Logs em tempo real via CLI
- GitHub Actions: Logs detalhados dos workflows

## 🔧 Configurações de Segurança

### Headers de Segurança

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### CORS

- Configurado para APIs
- Headers de segurança adicionais

## 🌐 Domínio Personalizado

### Vercel

1. Vá para Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Railway

1. Vá para Settings > Domains
2. Adicione seu domínio customizado
3. Configure DNS conforme instruções

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build falha**

   - Verifique logs do GitHub Actions
   - Confirme se todas as dependências estão instaladas
   - Verifique se o Node.js 18+ está sendo usado

2. **Variáveis de ambiente não encontradas**

   - Verifique se todas as variáveis estão configuradas
   - Confirme se os secrets do GitHub estão corretos

3. **Deploy não inicia**
   - Verifique se o workflow está ativo
   - Confirme se está na branch correta
   - Verifique permissões do repositório

### Comandos Úteis

```bash
# Verificar status do health check
curl https://your-domain.vercel.app/api/health

# Ver logs do Railway
railway logs

# Ver logs do Vercel
vercel logs

# Testar build localmente
npm run build
npm run preview
```

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Vercel/Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Secrets do GitHub configurados
- [ ] Workflows do GitHub Actions ativos
- [ ] Health check funcionando
- [ ] Domínio configurado (opcional)
- [ ] Monitoramento ativo
- [ ] Backup configurado (recomendado)

## 🔗 Links Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Railway](https://docs.railway.app)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Nuxt 3 Deploy](https://nuxt.com/docs/getting-started/deployment)
