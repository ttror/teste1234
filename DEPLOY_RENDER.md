# 🚀 Deploy no Render.com - Guia Completo

## 📋 Pré-requisitos

- ✅ Conta no GitHub (gratuita)
- ✅ Conta no Render.com (gratuita)
- ✅ Projeto pronto (você já tem!)

---

## 🎯 Passo 1: Criar Repositório no GitHub

### **1.1 - Acessar GitHub**
🔗 https://github.com/new

### **1.2 - Configurar Repositório**
- **Repository name:** `chatbot-psicologo`
- **Description:** `Chatbot psicológico com WhatsApp, OpenAI e Twilio`
- **Visibility:** 🔒 **Private** (IMPORTANTE: protege suas credenciais)
- **NÃO** marque: Initialize with README
- **NÃO** adicione .gitignore
- **NÃO** escolha licença

### **1.3 - Criar Repositório**
Clique em **"Create repository"**

---

## 🎯 Passo 2: Fazer Upload do Projeto

### **Opção A: Via Terminal (Recomendado)**

```bash
# 1. Entre na pasta do projeto
cd chatbot-psicologo

# 2. Adicione o repositório remoto
git remote add origin https://github.com/SEU-USUARIO/chatbot-psicologo.git

# 3. Faça o push
git push -u origin main
```

### **Opção B: Via GitHub Desktop**

1. Abra o GitHub Desktop
2. **File** → **Add Local Repository**
3. Selecione a pasta `chatbot-psicologo`
4. **Publish repository**
5. Marque **Private**
6. Clique em **Publish**

### **Opção C: Via Upload Manual**

1. No GitHub, clique em **"uploading an existing file"**
2. Arraste todos os arquivos do projeto
3. **NÃO** envie a pasta `node_modules`
4. Clique em **"Commit changes"**

---

## 🎯 Passo 3: Criar Conta no Render

### **3.1 - Acessar Render**
🔗 https://render.com

### **3.2 - Cadastrar**
1. Clique em **"Get Started for Free"**
2. **Escolha:** "Sign up with GitHub" (recomendado)
3. Autorize o Render a acessar seus repositórios

---

## 🎯 Passo 4: Criar Web Service

### **4.1 - Novo Serviço**
1. No Dashboard do Render, clique em **"New +"**
2. Selecione **"Web Service"**

### **4.2 - Conectar Repositório**
1. Procure por: `chatbot-psicologo`
2. Clique em **"Connect"**

### **4.3 - Configurar Serviço**

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `chatbot-psicologo` |
| **Region** | `Oregon (US West)` ou mais próximo |
| **Branch** | `main` |
| **Root Directory** | (deixe vazio) |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

---

## 🎯 Passo 5: Adicionar Variáveis de Ambiente

### **5.1 - Acessar Environment**
Na página de configuração, role até **"Environment Variables"**

### **5.2 - Adicionar Variáveis**
Clique em **"Add Environment Variable"** para cada uma:

#### **Variável 1: OPENAI_API_KEY**
```
Key: OPENAI_API_KEY
Value: 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
```

#### **Variável 2: OPENAI_PROJECT_ID**
```
Key: OPENAI_PROJECT_ID
Value: proj_IeJFrRePQtkoYgqJsnKIEV9p
```

#### **Variável 3: TWILIO_ACCOUNT_SID**
```
Key: TWILIO_ACCOUNT_SID
Value: AC9be6ad96d8312cda4c95c22512a15da7
```

#### **Variável 4: TWILIO_AUTH_TOKEN**
```
Key: TWILIO_AUTH_TOKEN
Value: a33e41b2ef8765dc569e481c7d2969f2
```

#### **Variável 5: TWILIO_WHATSAPP_NUMBER**
```
Key: TWILIO_WHATSAPP_NUMBER
Value: whatsapp:+14155238886
```

#### **Variável 6: TWILIO_CONTENT_SID**
```
Key: TWILIO_CONTENT_SID
Value: HXb5b62575e6e4ff6129ad7c8efe1f983e
```

#### **Variável 7: PORT**
```
Key: PORT
Value: 3000
```

#### **Variável 8: NODE_ENV**
```
Key: NODE_ENV
Value: production
```

#### **Variável 9: DEFAULT_RECIPIENT**
```
Key: DEFAULT_RECIPIENT
Value: whatsapp:+5518991462886
```

---

## 🎯 Passo 6: Fazer Deploy

### **6.1 - Criar Serviço**
1. Role até o final da página
2. Clique em **"Create Web Service"**

### **6.2 - Aguardar Deploy**
Você verá os logs em tempo real:

```
==> Cloning from https://github.com/seu-usuario/chatbot-psicologo...
==> Downloading cache...
==> Running build command 'npm install'...
==> Starting service with 'npm start'...

🤖 CHATBOT PSICOLÓGICO
============================================================
✅ Servidor rodando na porta 3000
📦 Plataforma: Render.com
🌐 URL Pública: https://chatbot-psicologo.onrender.com
============================================================
📱 Webhook WhatsApp: https://chatbot-psicologo.onrender.com/webhook/whatsapp
❤️  Health Check: https://chatbot-psicologo.onrender.com/webhook/health
📊 Status: https://chatbot-psicologo.onrender.com/webhook/status
============================================================
🔗 CONFIGURE ESTA URL NO TWILIO CONSOLE:
   https://chatbot-psicologo.onrender.com/webhook/whatsapp
============================================================
Aguardando mensagens do WhatsApp...

==> Your service is live 🎉
```

### **6.3 - Copiar URL**
Sua URL será algo como:
```
https://chatbot-psicologo.onrender.com
```

---

## 🎯 Passo 7: Testar o Serviço

### **Teste 1: Health Check**
Abra no navegador:
```
https://chatbot-psicologo.onrender.com/webhook/health
```

**Resultado esperado:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-23T...",
  "service": "Chatbot Psicológico"
}
```

✅ **Se ver isso, está funcionando!**

### **Teste 2: Informações do Serviço**
Abra no navegador:
```
https://chatbot-psicologo.onrender.com/
```

**Resultado esperado:**
```json
{
  "service": "Chatbot Psicológico",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "webhook": "/webhook/whatsapp",
    "health": "/webhook/health",
    "status": "/webhook/status"
  }
}
```

✅ **Perfeito!**

---

## 🎯 Passo 8: Configurar no Twilio

### **8.1 - Acessar Twilio Console**
🔗 https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox

### **8.2 - Configurar Webhook**
Na seção **"WHEN A MESSAGE COMES IN"**:

1. **URL:**
   ```
   https://chatbot-psicologo.onrender.com/webhook/whatsapp
   ```

2. **HTTP Method:** `POST`

3. **Clique em Save**

### **8.3 - Ativar WhatsApp Sandbox**
🔗 https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

1. Você verá: `join [código-único]`
2. Envie essa mensagem para: **+1 415 523 8886**
3. Aguarde: "You are all set!"

---

## 🎯 Passo 9: Testar o Chatbot

### **9.1 - Enviar Mensagem**
No WhatsApp, envie para **+1 415 523 8886**:
```
MENU
```

### **9.2 - Resposta Esperada**
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

✅ **FUNCIONOU! 🎉**

### **9.3 - Testar Consulta**
Envie:
```
1
```

Depois:
```
12345678900
```

Você deve receber os dados da Maria Silva!

---

## 📊 Monitoramento no Render

### **Ver Logs em Tempo Real**
1. No Dashboard do Render
2. Clique no seu serviço
3. Vá em **"Logs"**
4. Veja todas as mensagens recebidas

### **Verificar Status**
1. Dashboard → Seu serviço
2. Veja o status: **"Live"** ✅

### **Métricas**
1. Dashboard → Seu serviço
2. Vá em **"Metrics"**
3. Veja CPU, memória, requests

---

## 🔄 Atualizar o Projeto

### **Deploy Automático**
Sempre que você fizer push no GitHub, o Render faz deploy automático!

```bash
# 1. Faça suas alterações
# 2. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 3. Push
git push origin main

# 4. Render faz deploy automático! 🎉
```

---

## ⚙️ Configurações Avançadas

### **Custom Domain (Opcional)**
1. Dashboard → Seu serviço
2. **Settings** → **Custom Domains**
3. Adicione seu domínio

### **Auto-Deploy (Já Ativo)**
Deploy automático está ativado por padrão!

### **Health Check**
Já configurado em `/webhook/health`

### **Logs Persistentes**
Logs ficam salvos por 7 dias no plano gratuito

---

## 💰 Plano Gratuito

### **O Que Está Incluído:**
- ✅ 750 horas/mês (suficiente para 1 serviço 24/7)
- ✅ 100 GB de largura de banda
- ✅ Deploy automático
- ✅ SSL/HTTPS gratuito
- ✅ Logs por 7 dias
- ✅ Suporte comunitário

### **Limitações:**
- ⚠️ Serviço pode "dormir" após 15 minutos de inatividade
- ⚠️ Leva ~30 segundos para "acordar"
- ⚠️ 1 serviço web gratuito por conta

### **Solução para "Dormir":**
Use um serviço de ping (opcional):
- UptimeRobot: https://uptimerobot.com
- Cron-job.org: https://cron-job.org

Configure para fazer ping a cada 10 minutos:
```
https://chatbot-psicologo.onrender.com/webhook/health
```

---

## 🆘 Troubleshooting

### **Erro: "Build failed"**
**Causa:** Erro no `npm install`

**Solução:**
1. Verifique se `package.json` está correto
2. Veja os logs de build
3. Corrija o erro e faça push novamente

### **Erro: "Service unavailable"**
**Causa:** Serviço está "dormindo"

**Solução:**
1. Aguarde 30 segundos
2. Recarregue a página
3. Configure ping automático (UptimeRobot)

### **Erro: "Environment variable not found"**
**Causa:** Variável de ambiente não configurada

**Solução:**
1. Dashboard → Seu serviço
2. **Environment** → Adicione a variável
3. Clique em **"Save Changes"**
4. Render faz redeploy automático

### **Erro no Twilio: "Webhook timeout"**
**Causa:** Serviço estava dormindo

**Solução:**
1. Faça ping no health check primeiro
2. Aguarde serviço acordar
3. Tente novamente

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub (privado)
- [ ] Projeto enviado para o GitHub
- [ ] Conta criada no Render.com
- [ ] Web Service criado no Render
- [ ] Todas as 9 variáveis de ambiente adicionadas
- [ ] Deploy concluído com sucesso
- [ ] Health check funcionando
- [ ] URL copiada
- [ ] Webhook configurado no Twilio
- [ ] WhatsApp Sandbox ativado
- [ ] Teste enviando "MENU" realizado
- [ ] Chatbot respondeu corretamente

---

## 🎉 Parabéns!

Seu chatbot está **rodando em produção** no Render.com!

**Vantagens:**
- ✅ URL permanente
- ✅ Deploy automático
- ✅ Logs em tempo real
- ✅ SSL/HTTPS gratuito
- ✅ Fácil de manter
- ✅ 100% gratuito

**Próximos passos:**
- Configure ping automático (opcional)
- Monitore os logs
- Adicione novas funcionalidades
- Faça push e veja o deploy automático!

---

## 📞 URLs Finais

| Descrição | URL |
|-----------|-----|
| **Webhook (Twilio)** | https://chatbot-psicologo.onrender.com/webhook/whatsapp |
| **Health Check** | https://chatbot-psicologo.onrender.com/webhook/health |
| **Info** | https://chatbot-psicologo.onrender.com/ |
| **Dashboard Render** | https://dashboard.render.com |
| **Twilio Console** | https://console.twilio.com |

---

**Seu chatbot está no ar! 🚀🤖💙**

