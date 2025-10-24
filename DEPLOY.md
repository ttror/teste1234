# Instruções de Deploy - CodeSandbox

## Passo 1: Importar Projeto no CodeSandbox

1. Acesse https://codesandbox.io
2. Faça login na sua conta
3. Clique em "Import from GitHub" ou "Create Sandbox"
4. Selecione "Import from GitHub" e cole a URL do seu repositório
5. Aguarde o CodeSandbox importar o projeto

## Passo 2: Configurar Variáveis de Ambiente

No CodeSandbox, vá em **Server Control Panel** > **Environment Variables** e adicione:

```
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

## Passo 3: Instalar Dependências

O CodeSandbox instalará automaticamente as dependências do `package.json`.

Se necessário, execute manualmente no terminal:

```bash
npm install
```

## Passo 4: Iniciar o Servidor

Execute no terminal do CodeSandbox:

```bash
npm start
```

Ou use o modo de desenvolvimento:

```bash
npm run dev
```

## Passo 5: Configurar Webhook no Twilio

1. Acesse o Console do Twilio: https://console.twilio.com
2. Vá em **Messaging** > **Settings** > **WhatsApp Sandbox Settings**
3. Em "When a message comes in", adicione a URL do CodeSandbox:
   ```
   https://r463sf-3000.csb.app/webhook/whatsapp
   ```
4. Método: **POST**
5. Salve as configurações

**Nota**: Sua URL específica é `https://r463sf-3000.csb.app/webhook/whatsapp`

## Passo 6: Testar o Chatbot

1. No Twilio WhatsApp Sandbox, envie a mensagem de ativação para o número fornecido
2. Após ativar, envie "MENU" para iniciar
3. Teste as funcionalidades:
   - Consultar paciente (CPF: 12345678900)
   - Evolução diária
   - Gerar relatório
   - Nova sessão
   - Listar pacientes

## URLs Importantes

- **Webhook WhatsApp**: `https://r463sf-3000.csb.app/webhook/whatsapp`
- **Health Check**: `https://r463sf-3000.csb.app/webhook/health`
- **Status**: `https://r463sf-3000.csb.app/webhook/status`
- **Root**: `https://r463sf-3000.csb.app/`

## CPFs dos Pacientes Fictícios

1. **12345678900** - Maria Silva (TAG)
2. **23456789011** - João Santos (Depressão)
3. **34567890122** - Ana Costa (Pânico)
4. **45678901233** - Carlos Oliveira (TOC)
5. **56789012344** - Beatriz Lima (TEPT)

## Comandos Úteis

```bash
# Iniciar servidor
npm start

# Modo desenvolvimento (com nodemon)
npm run dev

# Executar testes
npm test

# Ver logs
# Os logs aparecem no terminal do CodeSandbox
```

## Troubleshooting

### Erro de Porta
Se houver erro de porta, verifique se a variável `PORT` está configurada corretamente.

### Webhook não responde
1. Verifique se o servidor está rodando
2. Confirme a URL do webhook no Twilio
3. Verifique os logs no CodeSandbox

### Erro de API
1. Verifique se as credenciais estão corretas
2. Confirme se as variáveis de ambiente foram salvas
3. Reinicie o servidor

## Suporte

Para problemas ou dúvidas:
- Verifique os logs no terminal do CodeSandbox
- Teste o endpoint `/webhook/health` para verificar se o servidor está ativo
- Revise as configurações do Twilio

---

**Nota**: Este projeto usa arquitetura MVC e segue as práticas da metodologia XP (Extreme Programming).

