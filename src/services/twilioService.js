/**
 * Twilio Service
 * Integração com API do Twilio para WhatsApp
 */

const twilio = require('twilio');

class TwilioService {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    this.client = twilio(this.accountSid, this.authToken);
  }

  /**
   * Envia mensagem via WhatsApp
   */
  async sendMessage(to, message) {
    try {
      // Garante que o número está no formato correto
      const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      
      const response = await this.client.messages.create({
        from: this.whatsappNumber,
        to: formattedTo,
        body: message
      });

      console.log(`Mensagem enviada: ${response.sid}`);
      return response;
    } catch (error) {
      console.error('Erro ao enviar mensagem Twilio:', error);
      throw new Error('Não foi possível enviar a mensagem.');
    }
  }

  /**
   * Envia mensagem com template (Content API)
   */
  async sendTemplateMessage(to, contentSid, variables = {}) {
    try {
      const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      
      const response = await this.client.messages.create({
        from: this.whatsappNumber,
        to: formattedTo,
        contentSid: contentSid,
        contentVariables: JSON.stringify(variables)
      });

      console.log(`Mensagem template enviada: ${response.sid}`);
      return response;
    } catch (error) {
      console.error('Erro ao enviar mensagem template:', error);
      throw new Error('Não foi possível enviar a mensagem template.');
    }
  }

  /**
   * Envia múltiplas mensagens (para mensagens longas)
   */
  async sendLongMessage(to, message, maxLength = 1600) {
    try {
      // Divide mensagem em partes se necessário
      if (message.length <= maxLength) {
        return await this.sendMessage(to, message);
      }

      const parts = this.splitMessage(message, maxLength);
      const responses = [];

      for (let i = 0; i < parts.length; i++) {
        const part = `[${i + 1}/${parts.length}]\n\n${parts[i]}`;
        const response = await this.sendMessage(to, part);
        responses.push(response);
        
        // Pequeno delay entre mensagens
        await this.delay(1000);
      }

      return responses;
    } catch (error) {
      console.error('Erro ao enviar mensagem longa:', error);
      throw new Error('Não foi possível enviar a mensagem.');
    }
  }

  /**
   * Divide mensagem em partes
   */
  splitMessage(message, maxLength) {
    const parts = [];
    let currentPart = '';

    const lines = message.split('\n');

    for (const line of lines) {
      if ((currentPart + line + '\n').length > maxLength) {
        if (currentPart) {
          parts.push(currentPart.trim());
          currentPart = '';
        }
        
        // Se uma linha é maior que maxLength, divide ela
        if (line.length > maxLength) {
          const chunks = line.match(new RegExp(`.{1,${maxLength}}`, 'g'));
          parts.push(...chunks.slice(0, -1));
          currentPart = chunks[chunks.length - 1] + '\n';
        } else {
          currentPart = line + '\n';
        }
      } else {
        currentPart += line + '\n';
      }
    }

    if (currentPart) {
      parts.push(currentPart.trim());
    }

    return parts;
  }

  /**
   * Valida webhook do Twilio
   */
  validateWebhook(signature, url, params) {
    try {
      return twilio.validateRequest(
        this.authToken,
        signature,
        url,
        params
      );
    } catch (error) {
      console.error('Erro ao validar webhook:', error);
      return false;
    }
  }

  /**
   * Extrai informações da mensagem recebida
   */
  parseIncomingMessage(body) {
    return {
      from: body.From,
      to: body.To,
      message: body.Body,
      messageId: body.MessageSid,
      timestamp: new Date(),
      profileName: body.ProfileName || 'Usuário'
    };
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Formata número de telefone
   */
  formatPhoneNumber(phone) {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Adiciona código do país se não tiver
    if (!cleaned.startsWith('55')) {
      return `whatsapp:+55${cleaned}`;
    }
    
    return `whatsapp:+${cleaned}`;
  }

  /**
   * Envia notificação de digitação (typing indicator)
   */
  async sendTypingIndicator(to) {
    // Twilio não suporta typing indicator nativamente
    // Esta é uma função placeholder para futuras implementações
    console.log(`Typing indicator para: ${to}`);
  }
}

module.exports = new TwilioService();

