/**
 * Report Controller
 * Gerencia geração de relatórios
 */

const database = require('../config/database');
const openaiService = require('../services/openaiService');
const Report = require('../models/Report');
const { validateCPF } = require('../utils/validators');
const templates = require('../views/messageTemplates');

class ReportController {
  /**
   * Gera relatório para paciente
   */
  async generateReport(cpf, reportType = 'general') {
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

      // Gera conteúdo do relatório usando IA
      const content = await openaiService.generateReport(patient, reportType);

      // Cria relatório
      const report = new Report(patient.cpf, reportType, content);

      // Salva relatório
      database.addReport(report);

      return {
        success: true,
        report,
        message: templates.reportMessage(report)
      };
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao gerar relatório')
      };
    }
  }

  /**
   * Lista relatórios de um paciente
   */
  async getPatientReports(cpf) {
    try {
      // Valida CPF
      if (!validateCPF(cpf)) {
        return {
          success: false,
          message: templates.invalidCPF()
        };
      }

      // Busca relatórios
      const reports = database.getReportsByPatient(cpf);

      if (reports.length === 0) {
        return {
          success: true,
          reports: [],
          message: '❌ Nenhum relatório encontrado para este paciente.'
        };
      }

      // Formata lista de relatórios
      let message = `📋 *RELATÓRIOS DO PACIENTE*\n\n`;
      message += `Total: ${reports.length} relatório(s)\n\n`;

      reports.forEach((report, index) => {
        message += `${index + 1}. ${report.getTypeLabel()} - ${report.getSummary().createdAt}\n`;
      });

      return {
        success: true,
        reports,
        message
      };
    } catch (error) {
      console.error('Erro ao listar relatórios:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao listar relatórios')
      };
    }
  }

  /**
   * Gera evolução diária com análise de IA
   */
  async generateDailyEvolution(cpf) {
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

      // Verifica se há histórico
      if (!patient.history || patient.history.length === 0) {
        return {
          success: false,
          message: '❌ Paciente não possui histórico de evolução.'
        };
      }

      // Gera análise da evolução diária
      const analysis = await openaiService.generateDailyEvolution(patient);

      let message = `📊 *EVOLUÇÃO DIÁRIA*\n\n`;
      message += `*Paciente:* ${patient.name}\n`;
      message += `*Data:* ${new Date().toLocaleDateString('pt-BR')}\n\n`;
      message += `───────────────────\n\n`;
      message += analysis;

      return {
        success: true,
        message
      };
    } catch (error) {
      console.error('Erro ao gerar evolução diária:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao gerar evolução diária')
      };
    }
  }

  /**
   * Lista todos os relatórios
   */
  async getAllReports() {
    try {
      const reports = database.getAllReports();

      if (reports.length === 0) {
        return {
          success: true,
          reports: [],
          message: '❌ Nenhum relatório encontrado.'
        };
      }

      let message = `📋 *TODOS OS RELATÓRIOS*\n\n`;
      message += `Total: ${reports.length} relatório(s)\n\n`;

      reports.forEach((report, index) => {
        const summary = report.getSummary();
        message += `${index + 1}. ${summary.type} - CPF: ${summary.patientCpf}\n`;
        message += `   Data: ${summary.createdAt}\n\n`;
      });

      return {
        success: true,
        reports,
        message
      };
    } catch (error) {
      console.error('Erro ao listar todos os relatórios:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao listar relatórios')
      };
    }
  }
}

module.exports = new ReportController();

