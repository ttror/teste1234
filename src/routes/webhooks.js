/**
 * Webhook Routes
 * Define rotas para webhooks do Twilio
 */

const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/WhatsAppController');

/**
 * POST /webhook/whatsapp
 * Recebe mensagens do Twilio WhatsApp
 */
router.post('/whatsapp', async (req, res) => {
  try {
    console.log('Webhook recebido:', req.body);

    // Processa mensagem
    const response = await whatsappController.handleIncomingMessage(req.body);

    // Extrai informações da mensagem
    const from = req.body.From;

    // Envia resposta
    await whatsappController.sendMessage(from, response);

    // Responde ao Twilio com 200 OK
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * GET /webhook/whatsapp
 * Validação do webhook (usado pelo Twilio para verificar URL)
 */
router.get('/whatsapp', (req, res) => {
  res.status(200).send('Webhook WhatsApp ativo');
});

/**
 * POST /webhook/status
 * Recebe atualizações de status de mensagens
 */
router.post('/status', (req, res) => {
  console.log('Status da mensagem:', req.body);
  res.status(200).send('OK');
});

/**
 * GET /health
 * Health check
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Chatbot Psicológico'
  });
});

module.exports = router;

