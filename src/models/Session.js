/**
 * Model: Session
 * Gerencia sessões de atendimento e conversas
 */

const { randomUUID } = require('crypto');

class Session {
  constructor(patientCpf, phoneNumber) {
    this.id = randomUUID();
    this.patientCpf = patientCpf;
    this.phoneNumber = phoneNumber;
    this.messages = [];
    this.status = 'active'; // active, completed, cancelled
    this.startedAt = new Date().toISOString();
    this.endedAt = null;
  }

  /**
   * Adiciona uma mensagem à sessão
   */
  addMessage(role, content) {
    this.messages.push({
      role, // user, assistant, system
      content,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Finaliza a sessão
   */
  endSession() {
    this.status = 'completed';
    this.endedAt = new Date().toISOString();
  }

  /**
   * Cancela a sessão
   */
  cancelSession() {
    this.status = 'cancelled';
    this.endedAt = new Date().toISOString();
  }

  /**
   * Retorna o histórico de mensagens formatado para OpenAI
   */
  getMessagesForAI() {
    return this.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Retorna duração da sessão em minutos
   */
  getDuration() {
    const end = this.endedAt ? new Date(this.endedAt) : new Date();
    const start = new Date(this.startedAt);
    return Math.round((end - start) / 1000 / 60);
  }

  /**
   * Retorna resumo da sessão
   */
  getSummary() {
    return {
      id: this.id,
      patientCpf: this.patientCpf,
      status: this.status,
      messageCount: this.messages.length,
      duration: this.getDuration(),
      startedAt: new Date(this.startedAt).toLocaleString('pt-BR'),
      endedAt: this.endedAt ? new Date(this.endedAt).toLocaleString('pt-BR') : null
    };
  }
}

module.exports = Session;

