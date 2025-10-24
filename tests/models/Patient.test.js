/**
 * Patient Model Tests
 * Testes unitários para o modelo Patient
 */

const Patient = require('../../src/models/Patient');

describe('Patient Model', () => {
  let patient;

  beforeEach(() => {
    patient = new Patient(
      '12345678900',
      'João Silva',
      'Ansiedade',
      [],
      'Em tratamento'
    );
  });

  test('deve criar paciente corretamente', () => {
    expect(patient.cpf).toBe('12345678900');
    expect(patient.name).toBe('João Silva');
    expect(patient.diagnosis).toBe('Ansiedade');
    expect(patient.currentStatus).toBe('Em tratamento');
    expect(patient.history).toEqual([]);
  });

  test('deve adicionar evolução', () => {
    patient.addEvolution('Primeira consulta');
    expect(patient.history.length).toBe(1);
    expect(patient.history[0].description).toBe('Primeira consulta');
  });

  test('deve atualizar status', () => {
    patient.updateStatus('Melhorando');
    expect(patient.currentStatus).toBe('Melhorando');
  });

  test('deve retornar resumo', () => {
    const summary = patient.getSummary();
    expect(summary.cpf).toBe('12345678900');
    expect(summary.name).toBe('João Silva');
    expect(summary.totalEvolutions).toBe(0);
  });

  test('deve formatar histórico', () => {
    patient.addEvolution('Primeira consulta');
    patient.addEvolution('Segunda consulta');
    const formatted = patient.getFormattedHistory();
    expect(formatted).toContain('Primeira consulta');
    expect(formatted).toContain('Segunda consulta');
  });
});

