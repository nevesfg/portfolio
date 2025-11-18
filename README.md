# 💼 Portfolio Profissional - Victor Neves

Um portfolio moderno e interativo desenvolvido com Next.js 16, React 19 e TypeScript, apresentando uma experiência única inspirada no design da Steam. Este projeto combina funcionalidades avançadas de frontend com integrações inteligentes de IA, oferecendo uma plataforma completa para showcase de projetos, habilidades e interação com visitantes.

O portfolio apresenta uma arquitetura robusta com componentes reutilizáveis, sistema de navegação fluido com scroll suave e efeitos modais, filtros dinâmicos de projetos por tecnologia, sistema de comentários com moderação por IA (OpenAI), integração com GitHub para análise de estatísticas de repositórios, e autenticação OAuth com LinkedIn. O design responsivo garante uma experiência perfeita em todos os dispositivos, desde desktops até smartphones, com animações suaves e transições cuidadosamente elaboradas.

Desenvolvido com foco em performance e experiência do usuário, o projeto utiliza as mais recentes tecnologias do ecossistema React, incluindo Server Components do Next.js, TypeScript para type safety, Tailwind CSS para estilização moderna, e integração com APIs externas. O sistema de moderação de comentários utiliza inteligência artificial para filtrar conteúdo inadequado automaticamente, enquanto o analisador de GitHub fornece insights detalhados sobre repositórios e contribuições.

## ✨ Funcionalidades Principais

-   **Design Steam-Inspired** com navegação lateral retrátil
-   **Filtros dinâmicos** de projetos por tecnologia e busca
-   **Sistema de comentários** com moderação por IA (OpenAI)
-   **Integração GitHub** para análise de repositórios
-   **Autenticação LinkedIn** OAuth
-   **Totalmente responsivo** com animações fluidas

## 🚀 Tecnologias

-   Next.js 16 | React 19 | TypeScript 5
-   Tailwind CSS 4 | OpenAI API | GitHub API

## 📦 Instalação

```bash
git clone https://github.com/nevesfg/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
npm run dev


# 1. Ir para a pasta do projeto
cd ~/apps/docker/portfolio

# 2. Ver as permissões atuais
ls -la src/app/config/comments.json

# 3. Dar permissão de leitura e escrita para todos
chmod 666 src/app/config/comments.json

# 4. Reiniciar o container
docker compose restart portfolio

# 5. Testar um comentário
```

## 🔑 Variáveis de Ambiente

```env
NEXT_PUBLIC_GITHUB_TOKEN=seu_token
OPENAI_API_KEY=sua_chave
LINKEDIN_CLIENT_ID=seu_id
LINKEDIN_CLIENT_SECRET=seu_secret
```

## 👤 Autor

**Victor Neves**

-   GitHub: [@nevesfg](https://github.com/nevesfg)

## 📄 Licença

MIT License

---

⭐ Se este projeto foi útil, considere dar uma estrela!
