# URLs Corretas para CodeSandbox

## 🌐 Sua URL Base do CodeSandbox

```
https://r463sf-3000.csb.app
```

---

## 📍 Endpoints Disponíveis

### **1. Webhook do WhatsApp (PRINCIPAL)**
```
https://r463sf-3000.csb.app/webhook/whatsapp
```

**Método:** POST  
**Uso:** Configure esta URL no Twilio Console  
**Descrição:** Recebe mensagens do WhatsApp

---

### **2. Health Check**
```
https://r463sf-3000.csb.app/webhook/health
```

**Método:** GET  
**Uso:** Verificar se o servidor está rodando  
**Resposta Esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-23T...",
  "service": "Chatbot Psicológico"
}
```

---

### **3. Status de Mensagens**
```
https://r463sf-3000.csb.app/webhook/status
```

**Método:** POST  
**Uso:** Recebe atualizações de status do Twilio (opcional)  
**Descrição:** Logs de entrega de mensagens

---

### **4. Informações do Serviço**
```
https://r463sf-3000.csb.app/
```

**Método:** GET  
**Uso:** Ver informações do serviço  
**Resposta:**
```json
{
  "service": "Chatbot Psicológico",
  "version": "1.0.0",
  "status": "running",
  "description": "Sistema de chatbot para acompanhamento psicológico via WhatsApp",
  "endpoints": {
    "webhook": "/webhook/whatsapp",
    "health": "/webhook/health",
    "status": "/webhook/status"
  }
}
```

---

## 🔧 Configuração no Twilio Console

### **WhatsApp Sandbox Settings**

1. **URL do Webhook:**
   ```
   https://r463sf-3000.csb.app/webhook/whatsapp
   ```

2. **HTTP Method:** `POST`

3. **Onde Configurar:**
   - Acesse: https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox
   - Seção: **"WHEN A MESSAGE COMES IN"**
   - Cole a URL acima
   - Selecione método: POST
   - Clique em **Save**

---

## 📝 Arquivos para Editar no CodeSandbox

### **Arquivo 1: server.js**
**Caminho:** `/server.js`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/server.js`

**O que editar:** Nada! As rotas estão corretas.

---

### **Arquivo 2: src/routes/webhooks.js**
**Caminho:** `/src/routes/webhooks.js`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/src/routes/webhooks.js`

**Rotas definidas:**
- `POST /whatsapp` → Recebe mensagens
- `GET /whatsapp` → Validação do webhook
- `POST /status` → Status de mensagens
- `GET /health` → Health check

**O que editar:** Nada! As rotas estão corretas.

---

### **Arquivo 3: .env**
**Caminho:** `/.env`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/.env`

**Variáveis necessárias:**
```env
OPENAI_API_KEY=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
OPENAI_PROJECT_ID=proj_IeJFrRePQtkoYgqJsnKIEV9p
TWILIO_ACCOUNT_SID=AC9be6ad96d8312cda4c95c22512a15da7
TWILIO_AUTH_TOKEN=a33e41b2ef8765dc569e481c7d2969f2
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_CONTENT_SID=HXb5b62575e6e4ff6129ad7c8efe1f983e
PORT=3000
NODE_ENV=production
DEFAULT_RECIPIENT=whatsapp:+5518991462886
```

---

### **Arquivo 4: src/controllers/WhatsAppController.js**
**Caminho:** `/src/controllers/WhatsAppController.js`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/src/controllers/WhatsAppController.js`

**O que editar:** Nada! A lógica está correta.

---

### **Arquivo 5: src/services/twilioService.js**
**Caminho:** `/src/services/twilioService.js`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/src/services/twilioService.js`

**O que editar:** Nada! A integração está correta.

---

### **Arquivo 6: src/services/openaiService.js**
**Caminho:** `/src/services/openaiService.js`  
**Link para editar:** `https://codesandbox.io/p/devbox/r463sf/src/services/openaiService.js`

**O que editar:** Nada! A integração está correta.

---

## ✅ Verificação das Rotas

### **Teste 1: Servidor Rodando**
```bash
curl https://r463sf-3000.csb.app/
```

**Resultado esperado:** Informações do serviço

---

### **Teste 2: Health Check**
```bash
curl https://r463sf-3000.csb.app/webhook/health
```

**Resultado esperado:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "Chatbot Psicológico"
}
```

---

### **Teste 3: Webhook (GET)**
```bash
curl https://r463sf-3000.csb.app/webhook/whatsapp
```

**Resultado esperado:** "Webhook WhatsApp ativo"

---

## 🎯 Estrutura de Rotas Atual

```
https://r463sf-3000.csb.app
│
├── /                          (GET)  → Informações do serviço
│
└── /webhook
    ├── /whatsapp             (POST) → Recebe mensagens do WhatsApp ✅
    ├── /whatsapp             (GET)  → Validação do webhook
    ├── /status               (POST) → Status de mensagens
    └── /health               (GET)  → Health check ✅
```

---

## 📋 Checklist de Configuração

- [x] ✅ Servidor rodando na porta 3000
- [x] ✅ Rotas configuradas corretamente
- [x] ✅ Webhook em `/webhook/whatsapp`
- [x] ✅ Health check em `/webhook/health`
- [ ] ⏳ URL configurada no Twilio Console (você precisa fazer)
- [ ] ⏳ WhatsApp Sandbox ativado (você precisa fazer)
- [ ] ⏳ Teste enviando mensagem no WhatsApp (você precisa fazer)

---

## 🚀 Próximos Passos

### **1. Configurar Webhook no Twilio**

1. Acesse: https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox
2. Em **"WHEN A MESSAGE COMES IN"**:
   - URL: `https://r463sf-3000.csb.app/webhook/whatsapp`
   - Method: `POST`
3. Clique em **Save**

### **2. Ativar WhatsApp Sandbox**

1. Acesse: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Envie `join [código]` para +1 415 523 8886
3. Aguarde confirmação

### **3. Testar**

1. Envie "MENU" no WhatsApp para +1 415 523 8886
2. Você deve receber o menu do chatbot

---

## 🔍 Logs e Debugging

### **Ver logs no CodeSandbox**

No terminal do CodeSandbox, você verá:
```
2025-10-23T... - POST /webhook/whatsapp
Mensagem recebida de whatsapp:+5518991462886: MENU
```

### **Verificar se mensagem chegou**

Quando você enviar uma mensagem no WhatsApp, deve aparecer no log:
```
Webhook recebido: { From: 'whatsapp:+5518991462886', Body: 'MENU', ... }
```

---

## ⚠️ Importante

### **As rotas estão CORRETAS!**

Você não precisa editar nenhum arquivo de rotas. A estrutura está perfeita:

- ✅ `server.js` → Configura rotas em `/webhook`
- ✅ `src/routes/webhooks.js` → Define rotas `/whatsapp`, `/health`, `/status`
- ✅ Controllers e Services → Processam as mensagens

### **O que você PRECISA fazer:**

1. **Configurar a URL no Twilio Console**
2. **Ativar o WhatsApp Sandbox**
3. **Testar enviando mensagem**

---

## 📞 URL Final para o Twilio

```
https://r463sf-3000.csb.app/webhook/whatsapp
```

**Copie esta URL e cole no Twilio Console!**

---

**Última atualização:** 23/10/2025  
**Status:** ✅ Servidor funcionando, rotas corretas!

