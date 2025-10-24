/**
 * Patient Controller
 * Gerencia operações relacionadas a pacientes
 */

const database = require('../config/database');
const { validateCPF, cleanCPF } = require('../utils/validators');
const templates = require('../views/messageTemplates');

class PatientController {
  /**
   * Busca paciente por CPF
   */
  async getPatientByCPF(cpf) {
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

      return {
        success: true,
        patient,
        message: templates.patientData(patient)
      };
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao buscar paciente')
      };
    }
  }

  /**
   * Lista todos os pacientes
   */
  async getAllPatients() {
    try {
      const patients = database.getAllPatients();

      return {
        success: true,
        patients,
        message: templates.patientList(patients)
      };
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao listar pacientes')
      };
    }
  }

  /**
   * Obtém histórico de evolução do paciente
   */
  async getPatientEvolution(cpf) {
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

      return {
        success: true,
        patient,
        message: templates.evolutionHistory(patient)
      };
    } catch (error) {
      console.error('Erro ao buscar evolução:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao buscar evolução')
      };
    }
  }

  /**
   * Obtém última evolução do paciente
   */
  async getLastEvolution(cpf) {
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

      return {
        success: true,
        patient,
        message: templates.lastEvolution(patient)
      };
    } catch (error) {
      console.error('Erro ao buscar última evolução:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao buscar última evolução')
      };
    }
  }

  /**
   * Adiciona evolução ao paciente
   */
  async addEvolution(cpf, evolution) {
    try {
      // Valida CPF
      if (!validateCPF(cpf)) {
        return {
          success: false,
          message: templates.invalidCPF()
        };
      }

      // Adiciona evolução
      const success = database.addEvolutionToPatient(cpf, evolution);

      if (!success) {
        return {
          success: false,
          message: templates.patientNotFound(cpf)
        };
      }

      return {
        success: true,
        message: '✅ Evolução adicionada com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao adicionar evolução:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao adicionar evolução')
      };
    }
  }

  /**
   * Atualiza status do paciente
   */
  async updateStatus(cpf, status) {
    try {
      // Valida CPF
      if (!validateCPF(cpf)) {
        return {
          success: false,
          message: templates.invalidCPF()
        };
      }

      // Atualiza status
      const success = database.updatePatientStatus(cpf, status);

      if (!success) {
        return {
          success: false,
          message: templates.patientNotFound(cpf)
        };
      }

      return {
        success: true,
        message: '✅ Status atualizado com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return {
        success: false,
        message: templates.errorMessage('Erro ao atualizar status')
      };
    }
  }
}

module.exports = new PatientController();

