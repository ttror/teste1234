/**
 * Model: Report
 * Gerencia relatórios e evolução clínica
 */

const { randomUUID } = require('crypto');

class Report {
  constructor(patientCpf, type, content) {
    this.id = randomUUID();
    this.patientCpf = patientCpf;
    this.type = type; // daily, weekly, monthly, general
    this.content = content;
    this.createdAt = new Date().toISOString();
  }

  /**
   * Formata o relatório para exibição
   */
  format() {
    const date = new Date(this.createdAt).toLocaleString('pt-BR');
    const typeLabel = this.getTypeLabel();
    
    return `
📋 *RELATÓRIO ${typeLabel.toUpperCase()}*
📅 Data: ${date}
👤 CPF: ${this.patientCpf}

${this.content}

---
ID: ${this.id}
    `.trim();
  }

  /**
   * Retorna label do tipo de relatório
   */
  getTypeLabel() {
    const labels = {
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
      general: 'Geral'
    };
    return labels[this.type] || 'Geral';
  }

  /**
   * Retorna resumo do relatório
   */
  getSummary() {
    return {
      id: this.id,
      patientCpf: this.patientCpf,
      type: this.getTypeLabel(),
      createdAt: new Date(this.createdAt).toLocaleString('pt-BR'),
      contentLength: this.content.length
    };
  }
}

module.exports = Report;

