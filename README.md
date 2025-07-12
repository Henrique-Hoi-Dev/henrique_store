# Henrique Store - E-commerce Nuxt 3

Um projeto de e-commerce completo desenvolvido com Nuxt 3, Tailwind CSS e Pinia para gerenciamento de estado.

## 🚀 Características

- **Nuxt 3** - Framework Vue.js moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Dark Mode** - Suporte completo ao modo escuro
- **Responsivo** - Design adaptável para todos os dispositivos
- **TypeScript** - Tipagem estática (opcional)
- **Fonte Inter** - Tipografia moderna e legível

## 📁 Estrutura do Projeto

```
henrique_store/
├── assets/
│   └── css/
│       └── main.css          # Estilos globais e Tailwind
├── components/
│   ├── Header.vue           # Cabeçalho da loja
│   ├── Footer.vue           # Rodapé da loja
│   └── CardProduto.vue      # Card de produto
├── composables/
│   ├── useCart.js           # Lógica do carrinho
│   └── useAuth.js           # Lógica de autenticação
├── layouts/
│   ├── default.vue          # Layout padrão da loja
│   └── admin.vue            # Layout do painel admin
├── middleware/
│   └── auth.js              # Middleware de autenticação
├── pages/
│   ├── index.vue            # Página inicial
│   ├── produtos/
│   │   └── index.vue        # Listagem de produtos
│   ├── carrinho.vue         # Carrinho de compras
│   ├── login.vue            # Página de login
│   └── admin/               # Páginas do admin
├── public/
│   └── images/              # Imagens estáticas
├── stores/
│   ├── cart.js              # Store do carrinho
│   ├── user.js              # Store do usuário
│   └── orders.js            # Store de pedidos
├── utils/
│   └── format.js            # Utilitários de formatação
├── nuxt.config.js           # Configuração do Nuxt
└── package.json             # Dependências
```

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/henrique-store.git
   cd henrique-store
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse o projeto**
   ```
   http://localhost:3000
   ```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Gerar site estático
npm run generate
```

## 🎨 Personalização

### Cores do Tema

As cores principais podem ser alteradas no arquivo `nuxt.config.js`:

```javascript
tailwindcss: {
  config: {
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            // ... outras variações
            900: '#1e3a8a'
          }
        }
      }
    }
  }
}
```

### Fonte

A fonte Inter está configurada por padrão. Para alterar, modifique o `nuxt.config.js`:

```javascript
app: {
  head: {
    link: [
      // Altere a URL da fonte aqui
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;500;600;700&display=swap',
      },
    ];
  }
}
```

## 🔧 Configurações

### Tailwind CSS

O Tailwind está configurado com:

- Fonte Inter
- Cores primárias customizadas
- Suporte a dark mode
- Componentes utilitários

### Pinia Stores

O projeto inclui três stores principais:

1. **Cart Store** - Gerencia o carrinho de compras
2. **User Store** - Gerencia autenticação e dados do usuário
3. **Orders Store** - Gerencia pedidos e histórico

### Middleware

O middleware de autenticação protege:

- Rotas `/admin/*` - Requer autenticação e permissão de admin
- Rota `/checkout` - Requer autenticação
- Rota `/perfil` - Requer autenticação

## 📱 Páginas Principais

### Loja

- **Home** (`/`) - Página inicial com produtos em destaque
- **Produtos** (`/produtos`) - Catálogo com filtros
- **Carrinho** (`/carrinho`) - Carrinho de compras
- **Login** (`/login`) - Autenticação
- **Cadastro** (`/cadastro`) - Registro de usuário

### Admin

- **Dashboard** (`/admin/dashboard`) - Painel principal
- **Produtos** (`/admin/produtos`) - Gerenciamento de produtos
- **Pedidos** (`/admin/pedidos`) - Gerenciamento de pedidos

## 🎯 Funcionalidades

### Carrinho de Compras

- Adicionar/remover produtos
- Alterar quantidades
- Cálculo automático de frete
- Persistência no localStorage

### Autenticação

- Login/Logout
- Registro de usuário
- Validação de formulários
- Proteção de rotas

### Produtos

- Listagem com filtros
- Busca por categoria
- Ordenação por preço/avaliação
- Paginação

### Dark Mode

- Toggle automático
- Persistência da preferência
- Suporte completo em todos os componentes

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
```

### Netlify

```bash
npm run generate
```

### Outros

O projeto pode ser deployado em qualquer plataforma que suporte Node.js ou sites estáticos.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma issue no GitHub ou entre em contato.

---

**Desenvolvido com ❤️ usando Nuxt 3**
