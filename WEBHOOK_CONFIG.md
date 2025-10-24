# Configuração do Webhook Twilio

## 🔗 URL do Seu Webhook

```
https://r463sf-3000.csb.app/webhook/whatsapp
```

## 📋 Passo a Passo Completo

### 1. Acessar o Console do Twilio

1. Acesse: https://console.twilio.com
2. Faça login com suas credenciais
3. Vá para o menu lateral

### 2. Configurar WhatsApp Sandbox

#### Opção A: WhatsApp Sandbox (Desenvolvimento/Teste)

1. No menu lateral, vá em: **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Ou acesse diretamente: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
3. Você verá um código como: `join [código-único]`
4. Envie este código para o número: **+1 415 523 8886** via WhatsApp
5. Aguarde confirmação de ativação

#### Opção B: WhatsApp Business API (Produção)

Se você tem WhatsApp Business API aprovado:

1. Vá em: **Messaging** → **Settings** → **WhatsApp Sender**
2. Configure seu número aprovado

### 3. Configurar o Webhook

#### Para WhatsApp Sandbox:

1. Vá em: **Messaging** → **Settings** → **WhatsApp Sandbox Settings**
2. Ou acesse: https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox
3. Na seção **Sandbox Configuration**, encontre:
   - **WHEN A MESSAGE COMES IN**

4. Configure:
   ```
   URL: https://r463sf-3000.csb.app/webhook/whatsapp
   HTTP Method: POST
   ```

5. Clique em **Save**

#### Para WhatsApp Business API:

1. Vá em: **Messaging** → **Settings** → **WhatsApp**
2. Configure o webhook na seção de configurações do seu número

### 4. Verificar Credenciais

Suas credenciais estão corretas:

```javascript
Account SID: AC9be6ad96d8312cda4c95c22512a15da7
Auth Token: a33e41b2ef8765dc569e481c7d2969f2
WhatsApp Number: whatsapp:+14155238886
```

✅ **Todas as credenciais já estão configuradas no arquivo .env**

### 5. Testar a Configuração

#### Teste 1: Verificar se o servidor está rodando

```bash
# No CodeSandbox ou terminal local
npm start
```

Acesse: https://r463sf-3000.csb.app/webhook/health

Você deve ver:
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "Chatbot Psicológico"
}
```

#### Teste 2: Testar credenciais Twilio

```bash
# No terminal do projeto
node test-twilio.js
```

Este script irá:
- ✅ Verificar se as credenciais estão corretas
- ✅ Validar a conta Twilio
- ✅ Enviar uma mensagem de teste para seu WhatsApp

#### Teste 3: Testar o chatbot

1. Abra o WhatsApp
2. Envie mensagem para: **+1 415 523 8886**
3. Digite: `MENU`
4. Você deve receber o menu do chatbot

## 🔧 Troubleshooting

### Erro: "Webhook não responde"

**Causa**: Servidor não está rodando ou URL incorreta

**Solução**:
1. Verifique se o servidor está rodando: `npm start`
2. Teste o health check: https://r463sf-3000.csb.app/webhook/health
3. Confirme a URL no Twilio: https://r463sf-3000.csb.app/webhook/whatsapp

### Erro: "Authentication failed"

**Causa**: Credenciais incorretas

**Solução**:
1. Verifique Account SID no arquivo .env
2. Verifique Auth Token no arquivo .env
3. Execute: `node test-twilio.js` para validar

### Erro: "WhatsApp not activated"

**Causa**: Sandbox não foi ativado

**Solução**:
1. Envie `join [seu-código]` para +1 415 523 8886
2. Aguarde mensagem de confirmação
3. Tente novamente

### Erro: "Message not received"

**Causa**: Webhook não configurado ou URL incorreta

**Solução**:
1. Verifique a URL do webhook no Twilio Console
2. Confirme que o método é POST
3. Teste o endpoint: https://r463sf-3000.csb.app/webhook/whatsapp

## 📱 Fluxo Completo de Teste

```
1. Ativar WhatsApp Sandbox
   └─> Enviar "join [código]" para +1 415 523 8886
   
2. Configurar Webhook
   └─> https://r463sf-3000.csb.app/webhook/whatsapp
   
3. Iniciar Servidor
   └─> npm start (no CodeSandbox)
   
4. Testar Credenciais
   └─> node test-twilio.js
   
5. Enviar Mensagem de Teste
   └─> Enviar "MENU" no WhatsApp
   
6. Receber Resposta do Chatbot
   └─> Menu com opções 1-6
```

## 🎯 URLs Importantes

| Endpoint | URL | Descrição |
|----------|-----|-----------|
| **Webhook WhatsApp** | https://r463sf-3000.csb.app/webhook/whatsapp | Recebe mensagens |
| **Health Check** | https://r463sf-3000.csb.app/webhook/health | Verifica status |
| **Status** | https://r463sf-3000.csb.app/webhook/status | Status de mensagens |
| **Root** | https://r463sf-3000.csb.app/ | Info do serviço |

## 📞 Números de Contato

| Tipo | Número | Formato |
|------|--------|---------|
| **Twilio WhatsApp** | +1 415 523 8886 | whatsapp:+14155238886 |
| **Seu WhatsApp** | +55 18 99146-2886 | whatsapp:+5518991462886 |

## ✅ Checklist Final

- [ ] WhatsApp Sandbox ativado (enviou "join [código]")
- [ ] Webhook configurado no Twilio Console
- [ ] URL do webhook: https://r463sf-3000.csb.app/webhook/whatsapp
- [ ] Método: POST
- [ ] Servidor rodando (npm start)
- [ ] Health check funcionando
- [ ] Teste de credenciais passou (node test-twilio.js)
- [ ] Mensagem de teste enviada
- [ ] Chatbot respondeu com MENU

## 🚀 Próximos Passos

Após configurar tudo:

1. Envie **MENU** no WhatsApp
2. Escolha opção **1** (Consultar Paciente)
3. Digite CPF: **12345678900**
4. Veja os dados da Maria Silva
5. Explore outras funcionalidades!

---

**Dúvidas?** Consulte a documentação completa em `DEPLOY.md` e `USAGE.md`

