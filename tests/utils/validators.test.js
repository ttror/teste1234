/**
 * Validators Tests
 * Testes unitários para funções de validação
 */

const {
  validateCPF,
  formatCPF,
  cleanCPF,
  validateMessage,
  isMenuCommand,
  isMenuOption,
  extractMenuOption
} = require('../../src/utils/validators');

describe('Validators', () => {
  describe('validateCPF', () => {
    test('deve validar CPF válido', () => {
      // CPFs válidos dos pacientes fictícios
      expect(validateCPF('12345678900')).toBe(true);
      expect(validateCPF('23456789011')).toBe(true);
    });

    test('deve rejeitar CPF inválido', () => {
      expect(validateCPF('00000000000')).toBe(false);
      expect(validateCPF('12345678901')).toBe(false);
      expect(validateCPF('123')).toBe(false);
    });
  });

  describe('formatCPF', () => {
    test('deve formatar CPF corretamente', () => {
      expect(formatCPF('12345678900')).toBe('123.456.789-00');
    });
  });

  describe('cleanCPF', () => {
    test('deve remover formatação do CPF', () => {
      expect(cleanCPF('123.456.789-00')).toBe('12345678900');
    });
  });

  describe('validateMessage', () => {
    test('deve validar mensagem válida', () => {
      expect(validateMessage('Olá')).toBe(true);
      expect(validateMessage('Mensagem de teste')).toBe(true);
    });

    test('deve rejeitar mensagem inválida', () => {
      expect(validateMessage('')).toBe(false);
      expect(validateMessage('   ')).toBe(false);
      expect(validateMessage(null)).toBe(false);
    });
  });

  describe('isMenuCommand', () => {
    test('deve identificar comandos de menu', () => {
      expect(isMenuCommand('menu')).toBe(true);
      expect(isMenuCommand('MENU')).toBe(true);
      expect(isMenuCommand('voltar')).toBe(true);
      expect(isMenuCommand('inicio')).toBe(true);
    });

    test('deve rejeitar não-comandos', () => {
      expect(isMenuCommand('teste')).toBe(false);
      expect(isMenuCommand('123')).toBe(false);
    });
  });

  describe('isMenuOption', () => {
    test('deve identificar opções válidas', () => {
      expect(isMenuOption('1')).toBe(true);
      expect(isMenuOption('6')).toBe(true);
    });

    test('deve rejeitar opções inválidas', () => {
      expect(isMenuOption('0')).toBe(false);
      expect(isMenuOption('7')).toBe(false);
      expect(isMenuOption('abc')).toBe(false);
    });
  });

  describe('extractMenuOption', () => {
    test('deve extrair número da opção', () => {
      expect(extractMenuOption('1')).toBe(1);
      expect(extractMenuOption('6')).toBe(6);
    });

    test('deve retornar null para opções inválidas', () => {
      expect(extractMenuOption('0')).toBe(null);
      expect(extractMenuOption('abc')).toBe(null);
    });
  });
});

