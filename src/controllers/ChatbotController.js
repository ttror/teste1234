/**
 * Chatbot Controller
 * Gerencia lógica de conversação e sessões
 */

const database = require('../config/database');
const openaiService = require('../services/openaiService');
const Session = require('../models/Session');
const { validateCPF, sanitizeInput } = require('../utils/validators');
const templates = require('../views/messageTemplates');

class ChatbotController {
  /**
   * Inicia nova sessão de atendimento
   */
  async startSession(phoneNumber, cpf) {
    try {
      // Valida CPF
      if (!validateCPF(cpf)) {
        return {
          success: false,
          message: templates.invalidCPF()
        };
      }

      // Busca paciente
      const patient = database.findPatientByCpf(cpf);

      if (!patient) {
        return {
          success: false,
          message: templates.patientNotFound(cpf)
        };
      }

      // Cria nova sessão
      const session = new Session(patient.cpf, phoneNumber);

      // Adiciona mensagem de sistema com contexto do paciente
      const systemContext = `Você está em uma sessão de atendimento com o paciente ${patient.name}.
      
Informações do paciente:
- Diagnóstico: ${patient.diagnosis}
- Status atual: ${patient.currentStatus}
- Total de evoluções: ${patient.history.length}

Responda perguntas sobre o paciente de forma profissional e empática.`;

      session.addMessage('system', systemContext);

      // Salva sessão
      database.setSession(phoneNumber, session);

      return {
        success: true,
        session,
        patient,
        message: templates.sessionStarted(patient.name)
      };
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao iniciar sessão')
      };
    }
  }

  /**
   * Processa mensagem em sessão ativa
   */
  async processSessionMessage(phoneNumber, userMessage) {
    try {
      // Busca sessão ativa
      const session = database.getSession(phoneNumber);

      if (!session) {
        return {
          success: false,
          message: '❌ Nenhuma sessão ativa. Inicie uma nova sessão primeiro.'
        };
      }

      // Sanitiza input
      const cleanMessage = sanitizeInput(userMessage);

      // Verifica comando de finalizar
      if (cleanMessage.toLowerCase() === 'finalizar') {
        return await this.endSession(phoneNumber);
      }

      // Adiciona mensagem do usuário
      session.addMessage('user', cleanMessage);

      // Busca paciente
      const patient = database.findPatientByCpf(session.patientCpf);

      // Gera resposta usando IA
      const response = await openaiService.answerPatientQuestion(patient, cleanMessage);

      // Adiciona resposta do assistente
      session.addMessage('assistant', response);

      return {
        success: true,
        message: response,
        session
      };
    } catch (error) {
      console.error('Erro ao processar mensagem da sessão:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao processar mensagem')
      };
    }
  }

  /**
   * Finaliza sessão ativa
   */
  async endSession(phoneNumber) {
    try {
      const session = database.getSession(phoneNumber);

      if (!session) {
        return {
          success: false,
          message: '❌ Nenhuma sessão ativa.'
        };
      }

      // Finaliza sessão
      session.endSession();

      const duration = session.getDuration();

      // Remove sessão da memória
      database.deleteSession(phoneNumber);

      return {
        success: true,
        message: templates.sessionEnded(duration),
        session
      };
    } catch (error) {
      console.error('Erro ao finalizar sessão:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao finalizar sessão')
      };
    }
  }

  /**
   * Verifica se há sessão ativa
   */
  hasActiveSession(phoneNumber) {
    const session = database.getSession(phoneNumber);
    return session && session.status === 'active';
  }

  /**
   * Obtém sessão ativa
   */
  getActiveSession(phoneNumber) {
    return database.getSession(phoneNumber);
  }

  /**
   * Processa mensagem livre (fora de sessão)
   */
  async processFreeMessage(userMessage, patient = null) {
    try {
      const cleanMessage = sanitizeInput(userMessage);

      let messages = [
        { role: 'user', content: cleanMessage }
      ];

      // Se há contexto de paciente, adiciona
      if (patient) {
        const context = `Contexto do paciente: ${patient.name}, Diagnóstico: ${patient.diagnosis}`;
        messages.unshift({ role: 'system', content: context });
      }

      const response = await openaiService.generateResponse(messages);

      return {
        success: true,
        message: response
      };
    } catch (error) {
      console.error('Erro ao processar mensagem livre:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao processar mensagem')
      };
    }
  }

  /**
   * Analisa intenção da mensagem do usuário
   */
  async analyzeIntent(userMessage) {
    try {
      const intent = await openaiService.analyzeIntent(userMessage);
      return intent;
    } catch (error) {
      console.error('Erro ao analisar intenção:', error);
      return 'conversa_livre';
    }
  }
}

module.exports = new ChatbotController();

