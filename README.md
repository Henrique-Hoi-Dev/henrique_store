# Henrique Store - E-commerce

Uma loja online moderna construída com Nuxt 3, oferecendo uma experiência de compra completa e integração com Mercado Pago.

## 🚀 Deploy Automático

O projeto está configurado com deploy automático usando GitHub Actions:

- **Vercel**: Deploy automático com preview para PRs
- **Railway**: Deploy alternativo com mais controle
- **CI/CD**: Verificações automáticas de qualidade de código

### Status do Deploy

[![Deploy to Vercel](https://img.shields.io/badge/Deploy%20to-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/henrique_store)
[![Deploy to Railway](https://img.shields.io/badge/Deploy%20to-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://railway.app/template/new?template=https://github.com/seu-usuario/henrique_store)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Mercado Pago (para pagamentos)

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/henrique_store.git
cd henrique_store

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas configurações

# Execute em modo desenvolvimento
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure:

```bash
# Configurações obrigatórias
MERCADO_PAGO_ACCESS_TOKEN=seu_token_aqui
MERCADO_PAGO_WEBHOOK_URL=https://seu-dominio.com/api/webhook
API_BASE_URL=https://seu-dominio.com

# Configurações opcionais
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=senha_segura
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Verificação de lint
npm run lint:fix     # Correção automática de lint
npm run typecheck    # Verificação de tipos

# Testes
npm run test         # Executar testes
npm run test:coverage # Testes com cobertura

# CI/CD
npm run ci:all       # Executar todas as verificações de CI
```

## 📁 Estrutura do Projeto

```
henrique_store/
├── components/          # Componentes Vue
├── pages/              # Páginas da aplicação
├── server/api/         # APIs do servidor
├── stores/             # Stores Pinia
├── composables/        # Composables
├── middleware/         # Middlewares
├── layouts/            # Layouts da aplicação
├── assets/             # Assets estáticos
├── public/             # Arquivos públicos
└── locales/            # Traduções (i18n)
```

## 🌐 Funcionalidades

- ✅ Catálogo de produtos
- ✅ Carrinho de compras
- ✅ Checkout integrado com Mercado Pago
- ✅ Painel administrativo
- ✅ Sistema de autenticação
- ✅ Internacionalização (i18n)
- ✅ Modo escuro/claro
- ✅ Design responsivo
- ✅ SEO otimizado

## 🔄 CI/CD Pipeline

O projeto inclui workflows do GitHub Actions para:

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

## 🔧 Tecnologias

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **Estado**: Pinia
- **Pagamentos**: Mercado Pago
- **Deploy**: Vercel, Railway
- **CI/CD**: GitHub Actions
- **Testes**: Vitest
- **Linting**: ESLint

## 📚 Documentação

- [Guia de Deploy](DEPLOY.md) - Instruções detalhadas de deploy
- [Documentação do Nuxt 3](https://nuxt.com/docs)
- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Railway](https://docs.railway.app)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/henrique_store/issues)
- **Documentação**: [DEPLOY.md](DEPLOY.md)
- **Email**: seu-email@exemplo.com

---

**Desenvolvido com ❤️ usando Nuxt 3**
