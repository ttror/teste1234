# Chatbot Psicológico - Visão Geral do Projeto

## 📋 Descrição

Sistema completo de chatbot para acompanhamento psicológico via WhatsApp, desenvolvido com arquitetura MVC e metodologia XP (Extreme Programming). O sistema utiliza inteligência artificial (OpenAI GPT-4) para processar linguagem natural e o Twilio para comunicação via WhatsApp.

## 🎯 Objetivos

- Auxiliar profissionais de psicologia no acompanhamento de pacientes
- Fornecer acesso rápido a informações clínicas
- Gerar relatórios automatizados com análise de IA
- Facilitar o acompanhamento da evolução diária dos pacientes
- Proporcionar interface conversacional via WhatsApp

## 🏗️ Arquitetura

### Padrão MVC (Model-View-Controller)

#### **Models (Modelos)**
- `Patient.js`: Gerenciamento de dados dos pacientes
- `Session.js`: Controle de sessões de atendimento
- `Report.js`: Estrutura de relatórios clínicos

#### **Views (Visualização)**
- `messageTemplates.js`: Templates de mensagens para WhatsApp
- Formatação de respostas e relatórios

#### **Controllers (Controladores)**
- `WhatsAppController.js`: Gerencia webhooks e fluxo de conversação
- `ChatbotController.js`: Lógica de conversação com IA
- `PatientController.js`: Operações CRUD de pacientes
- `ReportController.js`: Geração de relatórios

### Camadas Adicionais

#### **Services (Serviços)**
- `openaiService.js`: Integração com OpenAI API
- `twilioService.js`: Integração com Twilio WhatsApp API

#### **Config (Configuração)**
- `database.js`: Gerenciamento de dados
- `constants.js`: Constantes e configurações

#### **Utils (Utilitários)**
- `validators.js`: Validações (CPF, mensagens, etc.)
- `helpers.js`: Funções auxiliares

## 🛠️ Tecnologias

### Backend
- **Node.js** v22.x - Runtime JavaScript
- **Express.js** - Framework web
- **dotenv** - Gerenciamento de variáveis de ambiente

### Inteligência Artificial
- **OpenAI GPT-4** - Processamento de linguagem natural
- Análise de intenções
- Geração de relatórios
- Conversação contextual

### Comunicação
- **Twilio WhatsApp API** - Mensageria
- Webhooks para recebimento de mensagens
- Envio de mensagens longas

### Testes
- **Jest** - Framework de testes
- Testes unitários
- Cobertura de código

### Versionamento
- **Git** - Controle de versão
- **GitHub** - Repositório remoto

### Deploy
- **CodeSandbox** - Hospedagem e execução

## 📊 Metodologia XP (Extreme Programming)

### Práticas Aplicadas

1. **Simplicidade**
   - Código limpo e direto
   - Funções com responsabilidade única
   - Estrutura clara e organizada

2. **Feedback Rápido**
   - Respostas imediatas do chatbot
   - Mensagens de status e progresso
   - Validações em tempo real

3. **Refatoração Contínua**
   - Código modular e reutilizável
   - Separação de responsabilidades
   - Melhoria incremental

4. **Testes Automatizados**
   - Testes unitários com Jest
   - Cobertura de código
   - Validação de funcionalidades

5. **Integração Contínua**
   - Versionamento Git
   - Commits semânticos
   - Histórico organizado

## 📁 Estrutura de Diretórios

```
chatbot-psicologo/
├── src/
│   ├── controllers/        # Controladores MVC
│   ├── models/             # Modelos de dados
│   ├── views/              # Templates de mensagens
│   ├── services/           # Integrações externas
│   ├── config/             # Configurações
│   ├── routes/             # Rotas Express
│   └── utils/              # Utilitários
├── tests/                  # Testes unitários
├── data/                   # Banco de dados JSON
├── coverage/               # Cobertura de testes
├── server.js               # Servidor principal
├── package.json            # Dependências
├── .env                    # Variáveis de ambiente (não versionado)
├── .gitignore              # Arquivos ignorados pelo Git
├── DEPLOY.md               # Instruções de deploy
├── USAGE.md                # Manual de uso
└── PROJECT_OVERVIEW.md     # Este arquivo
```

## 🎭 Funcionalidades

### 1. Consulta de Pacientes
- Busca por CPF
- Exibição de dados completos
- Histórico de evoluções
- Status atual do tratamento

### 2. Evolução Diária
- Análise em tempo real
- Comparação com evoluções anteriores
- Insights gerados por IA
- Acompanhamento de progresso

### 3. Geração de Relatórios
- Relatórios diários, semanais, mensais e gerais
- Análise clínica automatizada
- Resumo de caso
- Recomendações profissionais

### 4. Sessões de Atendimento
- Conversação livre com IA
- Contexto do paciente mantido
- Respostas baseadas no histórico
- Finalização controlada

### 5. Listagem de Pacientes
- Visualização de todos os pacientes
- Informações resumidas
- Última atualização

### 6. Sistema de Ajuda
- Instruções de uso
- Comandos disponíveis
- Navegação facilitada

## 👥 Pacientes Fictícios

O sistema inclui 5 pacientes fictícios com casos clínicos completos:

1. **Maria Silva** (CPF: 12345678900)
   - Transtorno de Ansiedade Generalizada
   - 4 evoluções registradas

2. **João Santos** (CPF: 23456789011)
   - Episódio Depressivo Moderado
   - 5 evoluções registradas

3. **Ana Costa** (CPF: 34567890122)
   - Síndrome do Pânico
   - 6 evoluções registradas

4. **Carlos Oliveira** (CPF: 45678901233)
   - Transtorno Obsessivo-Compulsivo
   - 6 evoluções registradas

5. **Beatriz Lima** (CPF: 56789012344)
   - Transtorno de Estresse Pós-Traumático
   - 7 evoluções registradas

## 🔒 Segurança

- Validação de CPF com algoritmo oficial
- Sanitização de inputs do usuário
- Variáveis de ambiente para credenciais
- Logs de auditoria
- Isolamento de sessões por usuário

## 📈 Fluxo de Dados

```
WhatsApp → Twilio → Webhook → WhatsAppController
                                      ↓
                              Processa Mensagem
                                      ↓
                    ┌─────────────────┴─────────────────┐
                    ↓                                   ↓
            PatientController                  ChatbotController
                    ↓                                   ↓
                Database                          OpenAI Service
                    ↓                                   ↓
            ReportController                      Resposta IA
                    ↓                                   ↓
                    └─────────────────┬─────────────────┘
                                      ↓
                            Twilio Service
                                      ↓
                                  WhatsApp
```

## 🧪 Testes

### Cobertura Atual
- **Statements**: 86.88%
- **Branches**: 67.85%
- **Functions**: 86.66%
- **Lines**: 89.09%

### Testes Implementados
- Validação de CPF
- Formatação de dados
- Comandos de menu
- Modelos de dados
- Operações de pacientes

## 🚀 Deploy

### Requisitos
- Node.js 22.x ou superior
- Conta OpenAI com API key
- Conta Twilio com WhatsApp habilitado
- CodeSandbox (recomendado) ou servidor Node.js

### Passos
1. Clone o repositório
2. Configure variáveis de ambiente (.env)
3. Instale dependências: `npm install`
4. Execute testes: `npm test`
5. Inicie servidor: `npm start`
6. Configure webhook no Twilio

Veja `DEPLOY.md` para instruções detalhadas.

## 📖 Uso

### Comandos Principais
- `MENU` - Exibe menu principal
- `1-6` - Seleciona opção do menu
- `AJUDA` - Exibe ajuda
- `FINALIZAR` - Encerra sessão ativa

Veja `USAGE.md` para manual completo.

## 🔄 Versionamento

### Convenção de Commits
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `refactor:` - Refatoração
- `style:` - Formatação
- `chore:` - Manutenção

### Histórico
- v1.0.0 - Implementação inicial completa

## 📝 Licença

ISC License

## 👨‍💻 Desenvolvimento

Desenvolvido seguindo:
- Arquitetura MVC
- Metodologia XP
- Boas práticas de código
- SOLID principles
- Clean Code

## 🎓 Aprendizados

Este projeto demonstra:
- Integração de múltiplas APIs
- Processamento de linguagem natural
- Arquitetura escalável
- Testes automatizados
- Metodologias ágeis
- Desenvolvimento full-stack

## 🔮 Próximos Passos (Sugestões)

- [ ] Implementar banco de dados real (PostgreSQL/MongoDB)
- [ ] Adicionar autenticação de usuários
- [ ] Dashboard web para visualização
- [ ] Notificações automáticas
- [ ] Backup automático de dados
- [ ] Logs estruturados
- [ ] Métricas e analytics
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com prontuários eletrônicos
- [ ] API REST para integrações

---

**Desenvolvido com ❤️ usando Node.js, OpenAI e Twilio**

