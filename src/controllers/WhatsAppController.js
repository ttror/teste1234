/**
 * WhatsApp Controller
 * Gerencia webhooks e fluxo de conversação do WhatsApp
 */

const twilioService = require('../services/twilioService');
const patientController = require('./PatientController');
const reportController = require('./ReportController');
const chatbotController = require('./ChatbotController');
const { 
  validateCPF, 
  sanitizeInput, 
  isMenuCommand, 
  isMenuOption, 
  extractMenuOption 
} = require('../utils/validators');
const templates = require('../views/messageTemplates');

class WhatsAppController {
  constructor() {
    // Armazena estado da conversação por número de telefone
    this.conversationStates = new Map();
  }

  /**
   * Processa mensagem recebida do WhatsApp
   */
  async handleIncomingMessage(messageData) {
    try {
      const { from, message } = twilioService.parseIncomingMessage(messageData);
      const cleanMessage = sanitizeInput(message);

      console.log(`Mensagem recebida de ${from}: ${cleanMessage}`);

      // Verifica se há sessão ativa
      if (chatbotController.hasActiveSession(from)) {
        return await this.handleSessionMessage(from, cleanMessage);
      }

      // Verifica comando de menu
      if (isMenuCommand(cleanMessage)) {
        return await this.showMainMenu(from);
      }

      // Obtém estado da conversação
      const state = this.getConversationState(from);

      // Processa baseado no estado
      switch (state.status) {
        case 'waiting_cpf':
          return await this.handleCPFInput(from, cleanMessage, state);
        
        case 'waiting_report_type':
          return await this.handleReportTypeInput(from, cleanMessage, state);
        
        case 'menu':
        default:
          return await this.handleMenuSelection(from, cleanMessage);
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return templates.errorMessage();
    }
  }

  /**
   * Exibe menu principal
   */
  async showMainMenu(phoneNumber) {
    this.setConversationState(phoneNumber, { status: 'menu' });
    return templates.mainMenu();
  }

  /**
   * Processa seleção do menu
   */
  async handleMenuSelection(phoneNumber, message) {
    // Verifica se é opção numérica
    if (isMenuOption(message)) {
      const option = extractMenuOption(message);
      return await this.processMenuOption(phoneNumber, option);
    }

    // Verifica comandos textuais
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
      return templates.helpMessage();
    }

    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('começar')) {
      return templates.welcomeMessage();
    }

    // Opção inválida
    return templates.invalidOption();
  }

  /**
   * Processa opção do menu
   */
  async processMenuOption(phoneNumber, option) {
    switch (option) {
      case 1: // Consultar Paciente
        this.setConversationState(phoneNumber, { 
          status: 'waiting_cpf', 
          action: 'consult' 
        });
        return templates.requestCPF();

      case 2: // Evolução Diária
        this.setConversationState(phoneNumber, { 
          status: 'waiting_cpf', 
          action: 'evolution' 
        });
        return templates.requestCPF();

      case 3: // Gerar Relatório
        this.setConversationState(phoneNumber, { 
          status: 'waiting_cpf', 
          action: 'report' 
        });
        return templates.requestCPF();

      case 4: // Nova Sessão
        this.setConversationState(phoneNumber, { 
          status: 'waiting_cpf', 
          action: 'session' 
        });
        return templates.requestCPF();

      case 5: // Listar Pacientes
        const result = await patientController.getAllPatients();
        return result.message;

      case 6: // Ajuda
        return templates.helpMessage();

      default:
        return templates.invalidOption();
    }
  }

  /**
   * Processa entrada de CPF
   */
  async handleCPFInput(phoneNumber, cpf, state) {
    // Valida CPF
    if (!validateCPF(cpf)) {
      return templates.invalidCPF();
    }

    // Processa baseado na ação
    switch (state.action) {
      case 'consult':
        const consultResult = await patientController.getPatientByCPF(cpf);
        this.setConversationState(phoneNumber, { status: 'menu' });
        return consultResult.message;

      case 'evolution':
        const evolutionResult = await reportController.generateDailyEvolution(cpf);
        this.setConversationState(phoneNumber, { status: 'menu' });
        return evolutionResult.message;

      case 'report':
        // Salva CPF e pede tipo de relatório
        this.setConversationState(phoneNumber, { 
          status: 'waiting_report_type', 
          cpf: cpf 
        });
        return templates.chooseReportType();

      case 'session':
        const sessionResult = await chatbotController.startSession(phoneNumber, cpf);
        if (sessionResult.success) {
          this.setConversationState(phoneNumber, { status: 'in_session' });
        }
        return sessionResult.message;

      default:
        this.setConversationState(phoneNumber, { status: 'menu' });
        return templates.invalidOption();
    }
  }

  /**
   * Processa seleção de tipo de relatório
   */
  async handleReportTypeInput(phoneNumber, message, state) {
    const option = extractMenuOption(message);

    if (!option || option < 1 || option > 4) {
      return '❌ Opção inválida. Escolha entre 1 e 4.';
    }

    const reportTypes = {
      1: 'daily',
      2: 'weekly',
      3: 'monthly',
      4: 'general'
    };

    const reportType = reportTypes[option];
    
    // Gera relatório
    const result = await reportController.generateReport(state.cpf, reportType);
    
    this.setConversationState(phoneNumber, { status: 'menu' });
    
    return result.message;
  }

  /**
   * Processa mensagem em sessão ativa
   */
  async handleSessionMessage(phoneNumber, message) {
    const result = await chatbotController.processSessionMessage(phoneNumber, message);
    
    if (result.success && result.session && result.session.status === 'completed') {
      this.setConversationState(phoneNumber, { status: 'menu' });
    }
    
    return result.message;
  }

  /**
   * Envia mensagem via WhatsApp
   */
  async sendMessage(to, message) {
    try {
      await twilioService.sendLongMessage(to, message);
      return { success: true };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return { success: false, error };
    }
  }

  /**
   * Gerencia estado da conversação
   */
  getConversationState(phoneNumber) {
    if (!this.conversationStates.has(phoneNumber)) {
      this.conversationStates.set(phoneNumber, { status: 'menu' });
    }
    return this.conversationStates.get(phoneNumber);
  }

  setConversationState(phoneNumber, state) {
    this.conversationStates.set(phoneNumber, state);
  }

  clearConversationState(phoneNumber) {
    this.conversationStates.delete(phoneNumber);
  }

  /**
   * Envia mensagem de boas-vindas
   */
  async sendWelcomeMessage(to, userName = '') {
    const message = templates.welcomeMessage(userName);
    return await this.sendMessage(to, message);
  }
}

module.exports = new WhatsAppController();

