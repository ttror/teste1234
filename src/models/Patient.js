/**
 * Model: Patient
 * Gerencia dados dos pacientes e casos clínicos
 */

class Patient {
  constructor(cpf, name, diagnosis, history = [], currentStatus = '') {
    this.cpf = cpf;
    this.name = name;
    this.diagnosis = diagnosis;
    this.history = history;
    this.currentStatus = currentStatus;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Adiciona uma nova evolução ao histórico do paciente
   */
  addEvolution(evolution) {
    this.history.push({
      date: new Date().toISOString(),
      description: evolution,
      timestamp: Date.now()
    });
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Atualiza o status atual do paciente
   */
  updateStatus(status) {
    this.currentStatus = status;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Retorna o histórico completo formatado
   */
  getFormattedHistory() {
    return this.history.map((entry, index) => {
      const date = new Date(entry.date).toLocaleDateString('pt-BR');
      return `${index + 1}. ${date}: ${entry.description}`;
    }).join('\n');
  }

  /**
   * Retorna resumo do paciente
   */
  getSummary() {
    return {
      cpf: this.cpf,
      name: this.name,
      diagnosis: this.diagnosis,
      currentStatus: this.currentStatus,
      totalEvolutions: this.history.length,
      lastUpdate: new Date(this.updatedAt).toLocaleDateString('pt-BR')
    };
  }
}

module.exports = Patient;

