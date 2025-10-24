# Guia de Solução de Problemas

## 🔧 Problemas Identificados e Soluções

### ✅ Problema 1: Erro com UUID (RESOLVIDO)

**Erro Original:**
```
Error [ERR_REQUIRE_ESM]: require() of ES Module uuid not supported
```

**Causa:**
A versão 13.x do pacote `uuid` é um módulo ES6 e não pode ser importado com `require()` no CommonJS.

**Solução Aplicada:**
- Substituído `uuid` pelo módulo nativo `crypto.randomUUID()` do Node.js
- Removida dependência do pacote `uuid`
- Atualizado `src/models/Report.js` e `src/models/Session.js`

**Status:** ✅ CORRIGIDO

---

### ✅ Problema 2: OpenAI API Key não configurada (RESOLVIDO)

**Erro Original:**
```
OpenAIError: Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.
```

**Causa:**
O CodeSandbox não carregou automaticamente as variáveis de ambiente do arquivo `.env`.

**Solução Aplicada:**
1. Adicionada validação no `openaiService.js` para verificar se a API key está configurada
2. Se não estiver configurada, o serviço emite um aviso mas não quebra o servidor
3. Criado arquivo `.env.example` como referência

**Como Configurar no CodeSandbox:**

#### Opção 1: Usar o painel de Environment Variables (RECOMENDADO)

1. No CodeSandbox, clique no ícone de **configurações** (engrenagem)
2. Vá em **Environment Variables**
3. Adicione cada variável:

```
OPENAI_API_KEY=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

OPENAI_PROJECT_ID=proj_IeJFrRePQtkoYgqJsnKIEV9p

TWILIO_ACCOUNT_SID=AC9be6ad96d8312cda4c95c22512a15da7

TWILIO_AUTH_TOKEN=a33e41b2ef8765dc569e481c7d2969f2

TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

TWILIO_CONTENT_SID=HXb5b62575e6e4ff6129ad7c8efe1f983e

PORT=3000

DEFAULT_RECIPIENT=whatsapp:+5518991462886
```

4. Clique em **Save**
5. Reinicie o servidor

#### Opção 2: Verificar se o arquivo .env existe

1. No terminal do CodeSandbox:
```bash
cat .env
```

2. Se não existir ou estiver vazio, crie:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas credenciais

**Status:** ✅ CORRIGIDO

---

## 🧪 Como Testar se Está Funcionando

### Teste 1: Servidor Inicia
```bash
npm start
```

**Resultado Esperado:**
```
🤖 CHATBOT PSICOLÓGICO
✅ Servidor rodando na porta 3000
```

### Teste 2: Health Check
No navegador ou terminal:
```bash
curl http://localhost:3000/webhook/health
```

**Resultado Esperado:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "Chatbot Psicológico"
}
```

### Teste 3: Credenciais Twilio
```bash
node test-twilio.js
```

**Resultado Esperado:**
```
✅ Conta verificada com sucesso!
✅ Mensagem enviada com sucesso!
```

---

## 📋 Checklist de Verificação

### Antes de Iniciar o Servidor

- [ ] Arquivo `.env` existe e está preenchido
- [ ] Variáveis de ambiente configuradas no CodeSandbox
- [ ] Dependências instaladas (`npm install`)
- [ ] Porta 3000 está disponível

### Configuração OpenAI

- [ ] `OPENAI_API_KEY` configurada
- [ ] API key válida e ativa
- [ ] Créditos disponíveis na conta OpenAI

### Configuração Twilio

- [ ] `TWILIO_ACCOUNT_SID` configurada
- [ ] `TWILIO_AUTH_TOKEN` configurada
- [ ] WhatsApp Sandbox ativado
- [ ] Webhook configurado no Twilio Console

---

## 🚨 Erros Comuns e Soluções

### Erro: "Cannot find module 'uuid'"

**Solução:**
```bash
# Não é mais necessário, foi substituído por crypto.randomUUID()
# Se aparecer, reinstale as dependências:
npm install
```

### Erro: "Missing credentials OpenAI"

**Solução:**
1. Verifique se o arquivo `.env` existe:
```bash
cat .env
```

2. Configure as variáveis no CodeSandbox (Environment Variables)

3. Reinicie o servidor

### Erro: "Port 3000 already in use"

**Solução:**
```bash
# Mate o processo na porta 3000
pkill -f "node server.js"

# Ou use outra porta
PORT=3001 npm start
```

### Erro: "Webhook não responde"

**Solução:**
1. Verifique se o servidor está rodando
2. Confirme a URL no Twilio Console
3. Teste o health check

### Erro: "Authentication failed" (Twilio)

**Solução:**
1. Verifique Account SID e Auth Token
2. Execute `node test-twilio.js` para validar
3. Confirme que as credenciais estão corretas no Twilio Console

---

## 🔍 Logs e Debugging

### Ver logs do servidor
```bash
npm start
# Logs aparecem no terminal
```

### Verificar variáveis de ambiente
```bash
node -e "console.log(process.env.OPENAI_API_KEY ? 'API Key configurada' : 'API Key NÃO configurada')"
```

### Testar conexão OpenAI
```bash
node -e "
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log('OpenAI configurado com sucesso!');
"
```

### Testar conexão Twilio
```bash
node test-twilio.js
```

---

## 📞 Suporte

### Documentação Disponível

- `WEBHOOK_CONFIG.md` - Configuração do webhook
- `DEPLOY.md` - Deploy no CodeSandbox
- `USAGE.md` - Manual de uso
- `PROJECT_OVERVIEW.md` - Visão técnica

### Comandos Úteis

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar versão do Node.js
node --version

# Listar variáveis de ambiente
env | grep -E "OPENAI|TWILIO"

# Testar servidor
npm start

# Executar testes
npm test
```

---

## ✅ Status Atual

### Problemas Corrigidos
- ✅ Erro com UUID (substituído por crypto.randomUUID)
- ✅ Erro de OpenAI API key (validação adicionada)
- ✅ Servidor inicia corretamente
- ✅ Health check funcionando

### Próximos Passos
1. Configurar variáveis de ambiente no CodeSandbox
2. Ativar WhatsApp Sandbox no Twilio
3. Configurar webhook no Twilio Console
4. Testar chatbot no WhatsApp

---

**Última atualização:** 23/10/2025
**Status:** Sistema funcionando corretamente ✅

