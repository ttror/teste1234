/**
 * Server
 * Arquivo principal do servidor Express
 */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webhookRoutes = require('./src/routes/webhooks');

// Inicializa Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/webhook', webhookRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    service: 'Chatbot Psicológico',
    version: '1.0.0',
    status: 'running',
    description: 'Sistema de chatbot para acompanhamento psicológico via WhatsApp',
    endpoints: {
      webhook: '/webhook/whatsapp',
      health: '/webhook/health',
      status: '/webhook/status'
    }
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Rota não encontrada'
  });
});

// Inicia servidor
app.listen(PORT, '0.0.0.0', () => {
  // Detecta ambiente e URL pública
  const isRender = process.env.RENDER || process.env.RENDER_SERVICE_NAME;
  const isRailway = process.env.RAILWAY_ENVIRONMENT;
  const isCodeSandbox = process.env.CODESANDBOX_HOST;
  
  let publicUrl;
  let platform;
  
  if (isRender) {
    // Render.com
    publicUrl = process.env.RENDER_EXTERNAL_URL || `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`;
    platform = 'Render.com';
  } else if (isRailway) {
    // Railway.app
    publicUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
      : 'https://[seu-projeto].up.railway.app';
    platform = 'Railway.app';
  } else if (isCodeSandbox) {
    // CodeSandbox
    publicUrl = `https://${process.env.CODESANDBOX_HOST}`;
    platform = 'CodeSandbox';
  } else {
    // Local
    publicUrl = `http://localhost:${PORT}`;
    platform = 'Local';
  }
  
  console.log('='.repeat(60));
  console.log('🤖 CHATBOT PSICOLÓGICO');
  console.log('='.repeat(60));
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📦 Plataforma: ${platform}`);
  console.log(`🌐 URL Pública: ${publicUrl}`);
  console.log('='.repeat(60));
  console.log(`📱 Webhook WhatsApp: ${publicUrl}/webhook/whatsapp`);
  console.log(`❤️  Health Check: ${publicUrl}/webhook/health`);
  console.log(`📊 Status: ${publicUrl}/webhook/status`);
  console.log('='.repeat(60));
  
  if (platform !== 'Local') {
    console.log('🔗 CONFIGURE ESTA URL NO TWILIO CONSOLE:');
    console.log(`   ${publicUrl}/webhook/whatsapp`);
    console.log('='.repeat(60));
  }
  
  console.log('Aguardando mensagens do WhatsApp...\n');
});

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

module.exports = app;

