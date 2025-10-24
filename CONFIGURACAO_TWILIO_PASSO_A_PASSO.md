# Configuração Twilio - Passo a Passo Visual

## 🎯 URL que Você Vai Usar

```
https://r463sf-3000.csb.app/webhook/whatsapp
```

---

## 📋 PASSO 1: Ativar WhatsApp Sandbox

### **1.1 - Acessar o Sandbox**

🔗 **Link direto:** https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

Ou navegue:
1. Login no Twilio Console: https://console.twilio.com
2. Menu lateral → **Messaging**
3. Submenu → **Try it out**
4. Clique em → **Send a WhatsApp message**

---

### **1.2 - Obter o Código de Ativação**

Na página do Sandbox, você verá algo como:

```
┌─────────────────────────────────────────┐
│  To connect your sandbox, send this    │
│  WhatsApp message from your device:    │
│                                         │
│  join [código-único-aqui]              │
│                                         │
│  To: +1 415 523 8886                   │
└─────────────────────────────────────────┘
```

**Exemplo:** `join happy-elephant-123`

---

### **1.3 - Enviar Mensagem de Ativação**

1. Abra o **WhatsApp** no seu celular
2. Adicione o contato: **+1 415 523 8886**
3. Envie a mensagem: `join [seu-código]`
4. Aguarde a confirmação:

```
✅ "You are all set! Your sandbox is now active."
```

---

## 📋 PASSO 2: Configurar Webhook

### **2.1 - Acessar Configurações do Sandbox**

🔗 **Link direto:** https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox

Ou navegue:
1. Menu lateral → **Messaging**
2. Submenu → **Settings**
3. Clique em → **WhatsApp Sandbox Settings**

---

### **2.2 - Configurar "When a message comes in"**

Na página de configurações, você verá:

```
┌─────────────────────────────────────────────────────┐
│  SANDBOX CONFIGURATION                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  WHEN A MESSAGE COMES IN                           │
│  ┌───────────────────────────────────────────────┐ │
│  │ https://r463sf-3000.csb.app/webhook/whatsapp │ │ ← COLE AQUI
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  HTTP Method: [POST ▼]                             │ ← SELECIONE POST
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Preencha:**
1. **URL:** `https://r463sf-3000.csb.app/webhook/whatsapp`
2. **HTTP Method:** Selecione `POST` no dropdown
3. Clique em **Save** no final da página

---

### **2.3 - Configuração Opcional: Status Callback**

Se quiser receber atualizações de status (opcional):

```
┌─────────────────────────────────────────────────────┐
│  STATUS CALLBACK URL (Optional)                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ https://r463sf-3000.csb.app/webhook/status    │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  HTTP Method: [POST ▼]                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📋 PASSO 3: Verificar Configuração

### **3.1 - Verificar se o Servidor Está Rodando**

Abra no navegador:
```
https://r463sf-3000.csb.app/webhook/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-23T...",
  "service": "Chatbot Psicológico"
}
```

✅ Se ver isso, o servidor está funcionando!

---

### **3.2 - Verificar Webhook**

Abra no navegador:
```
https://r463sf-3000.csb.app/webhook/whatsapp
```

**Resposta esperada:**
```
Webhook WhatsApp ativo
```

✅ Se ver isso, o webhook está configurado!

---

## 📋 PASSO 4: Testar o Chatbot

### **4.1 - Enviar Primeira Mensagem**

No WhatsApp, envie para **+1 415 523 8886**:

```
MENU
```

---

### **4.2 - Resposta Esperada**

Você deve receber:

```
🤖 CHATBOT PSICOLÓGICO

Como posso ajudar?

1️⃣ Consultar Paciente (CPF)
2️⃣ Evolução Diária
3️⃣ Gerar Relatório
4️⃣ Nova Sessão
5️⃣ Listar Pacientes
6️⃣ Ajuda

Digite o número da opção desejada.
```

✅ **FUNCIONOU!** 🎉

---

### **4.3 - Testar Consulta de Paciente**

Envie:
```
1
```

Resposta:
```
🔍 CONSULTAR PACIENTE

Por favor, informe o CPF do paciente:

Formato: 12345678900 ou 123.456.789-00

Digite MENU para cancelar.
```

Envie:
```
12345678900
```

Resposta:
```
👤 DADOS DO PACIENTE

Nome: Maria Silva
CPF: 123.456.789-00
Diagnóstico: Transtorno de Ansiedade Generalizada (TAG)

📊 Status Atual:
Evolução positiva com redução significativa dos sintomas ansiosos...

📅 Cadastrado em: 01/10/2025
🔄 Última atualização: 22/10/2025
📝 Total de evoluções: 4

Digite MENU para voltar.
```

✅ **PERFEITO!** O chatbot está funcionando completamente! 🎉

---

## 🔍 Troubleshooting

### ❌ Problema: "Webhook não responde"

**Verificar:**
1. Servidor está rodando no CodeSandbox?
2. URL está correta no Twilio?
3. Método é POST?

**Solução:**
```bash
# Teste o health check
curl https://r463sf-3000.csb.app/webhook/health

# Se não responder, reinicie o servidor no CodeSandbox
```

---

### ❌ Problema: "Mensagem não chega no chatbot"

**Verificar:**
1. WhatsApp Sandbox está ativado?
2. Você enviou "join [código]"?
3. Recebeu confirmação do Twilio?

**Solução:**
1. Reenvie "join [código]" para +1 415 523 8886
2. Aguarde confirmação
3. Tente novamente

---

### ❌ Problema: "Chatbot não responde"

**Verificar logs no CodeSandbox:**

Você deve ver algo como:
```
2025-10-23T... - POST /webhook/whatsapp
Webhook recebido: { From: 'whatsapp:+5518991462886', Body: 'MENU', ... }
Mensagem recebida de whatsapp:+5518991462886: MENU
```

Se não aparecer, o webhook não está configurado corretamente.

---

## ✅ Checklist Final

- [ ] WhatsApp Sandbox ativado
  - [ ] Enviou "join [código]" para +1 415 523 8886
  - [ ] Recebeu confirmação "You are all set!"

- [ ] Webhook configurado no Twilio
  - [ ] URL: `https://r463sf-3000.csb.app/webhook/whatsapp`
  - [ ] Método: POST
  - [ ] Clicou em Save

- [ ] Servidor funcionando
  - [ ] Health check responde: `https://r463sf-3000.csb.app/webhook/health`
  - [ ] Webhook responde: `https://r463sf-3000.csb.app/webhook/whatsapp`

- [ ] Teste realizado
  - [ ] Enviou "MENU" no WhatsApp
  - [ ] Recebeu menu com opções 1-6
  - [ ] Testou opção 1 com CPF 12345678900

---

## 🎉 Pronto!

Se você completou todos os passos acima, seu chatbot está **100% funcional**!

Agora você pode:
- ✅ Consultar pacientes por CPF
- ✅ Ver evolução diária
- ✅ Gerar relatórios
- ✅ Iniciar sessões de atendimento
- ✅ Listar todos os pacientes

---

## 📞 Contatos Importantes

| Item | Valor |
|------|-------|
| **Número Twilio WhatsApp** | +1 415 523 8886 |
| **Seu WhatsApp** | +55 18 99146-2886 |
| **URL do Webhook** | https://r463sf-3000.csb.app/webhook/whatsapp |
| **Health Check** | https://r463sf-3000.csb.app/webhook/health |

---

## 📚 Documentação Adicional

- `URLS_CODESANDBOX.md` - Todas as URLs e endpoints
- `WEBHOOK_CONFIG.md` - Configuração detalhada do webhook
- `TROUBLESHOOTING.md` - Solução de problemas
- `USAGE.md` - Manual completo de uso do chatbot

---

**Boa sorte com seu chatbot psicológico! 🤖💙**

