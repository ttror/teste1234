/**
 * Validators
 * Funções de validação
 */

const { VALIDATION } = require('../config/constants');

/**
 * Valida CPF
 */
function validateCPF(cpf) {
  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== VALIDATION.CPF_LENGTH) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  // Validação dos dígitos verificadores
  let sum = 0;
  let remainder;

  // Valida primeiro dígito
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(9, 10))) return false;

  // Valida segundo dígito
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(10, 11))) return false;

  return true;
}

/**
 * Formata CPF
 */
function formatCPF(cpf) {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Limpa CPF (remove formatação)
 */
function cleanCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

/**
 * Valida mensagem
 */
function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return false;
  }

  const length = message.trim().length;
  return length >= VALIDATION.MIN_MESSAGE_LENGTH && 
         length <= VALIDATION.MAX_MESSAGE_LENGTH;
}

/**
 * Valida número de telefone
 */
function validatePhoneNumber(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  // Valida formato brasileiro: DDI (55) + DDD (2 dígitos) + Número (8 ou 9 dígitos)
  return /^55\d{10,11}$/.test(cleanPhone);
}

/**
 * Sanitiza input do usuário
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove caracteres perigosos mas mantém acentuação
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .substring(0, VALIDATION.MAX_MESSAGE_LENGTH);
}

/**
 * Verifica se é comando do menu
 */
function isMenuCommand(message) {
  const cleanMessage = message.trim().toLowerCase();
  return ['menu', 'voltar', 'inicio', 'começar'].includes(cleanMessage);
}

/**
 * Verifica se é número de opção do menu
 */
function isMenuOption(message) {
  const cleanMessage = message.trim();
  return /^[1-6]$/.test(cleanMessage);
}

/**
 * Extrai número da opção
 */
function extractMenuOption(message) {
  const match = message.trim().match(/^([1-6])$/);
  return match ? parseInt(match[1]) : null;
}

module.exports = {
  validateCPF,
  formatCPF,
  cleanCPF,
  validateMessage,
  validatePhoneNumber,
  sanitizeInput,
  isMenuCommand,
  isMenuOption,
  extractMenuOption
};

