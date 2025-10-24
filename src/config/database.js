/**
 * Database Configuration
 * Gerencia acesso aos dados dos pacientes
 */

const fs = require('fs');
const path = require('path');
const Patient = require('../models/Patient');

class Database {
  constructor() {
    this.dataPath = path.join(__dirname, '../../data/patients.json');
    this.sessions = new Map(); // Armazena sessões ativas em memória
    this.reports = []; // Armazena relatórios em memória
  }

  /**
   * Carrega dados do arquivo JSON
   */
  loadData() {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return { patients: [] };
    }
  }

  /**
   * Salva dados no arquivo JSON
   */
  saveData(data) {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  }

  /**
   * Busca paciente por CPF
   */
  findPatientByCpf(cpf) {
    const data = this.loadData();
    const cleanCpf = cpf.replace(/\D/g, '');
    return data.patients.find(p => p.cpf === cleanCpf);
  }

  /**
   * Lista todos os pacientes
   */
  getAllPatients() {
    const data = this.loadData();
    return data.patients;
  }

  /**
   * Adiciona evolução ao paciente
   */
  addEvolutionToPatient(cpf, evolution) {
    const data = this.loadData();
    const cleanCpf = cpf.replace(/\D/g, '');
    const patientIndex = data.patients.findIndex(p => p.cpf === cleanCpf);
    
    if (patientIndex === -1) {
      return false;
    }

    data.patients[patientIndex].history.push({
      date: new Date().toISOString(),
      description: evolution,
      timestamp: Date.now()
    });
    data.patients[patientIndex].updatedAt = new Date().toISOString();

    return this.saveData(data);
  }

  /**
   * Atualiza status do paciente
   */
  updatePatientStatus(cpf, status) {
    const data = this.loadData();
    const cleanCpf = cpf.replace(/\D/g, '');
    const patientIndex = data.patients.findIndex(p => p.cpf === cleanCpf);
    
    if (patientIndex === -1) {
      return false;
    }

    data.patients[patientIndex].currentStatus = status;
    data.patients[patientIndex].updatedAt = new Date().toISOString();

    return this.saveData(data);
  }

  /**
   * Gerencia sessões ativas
   */
  getSession(phoneNumber) {
    return this.sessions.get(phoneNumber);
  }

  setSession(phoneNumber, session) {
    this.sessions.set(phoneNumber, session);
  }

  deleteSession(phoneNumber) {
    this.sessions.delete(phoneNumber);
  }

  /**
   * Gerencia relatórios
   */
  addReport(report) {
    this.reports.push(report);
  }

  getReportsByPatient(cpf) {
    const cleanCpf = cpf.replace(/\D/g, '');
    return this.reports.filter(r => r.patientCpf === cleanCpf);
  }

  getAllReports() {
    return this.reports;
  }
}

// Singleton
const database = new Database();

module.exports = database;

