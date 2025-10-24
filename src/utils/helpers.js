/**
 * Helpers
 * Funções auxiliares
 */

/**
 * Formata data para exibição
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Formata data apenas (sem hora)
 */
function formatDateOnly(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Calcula diferença de dias entre datas
 */
function daysDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Formata lista de pacientes
 */
function formatPatientList(patients) {
  if (!patients || patients.length === 0) {
    return '❌ Nenhum paciente encontrado.';
  }

  let message = '📋 *LISTA DE PACIENTES*\n\n';
  
  patients.forEach((patient, index) => {
    message += `${index + 1}. *${patient.name}*\n`;
    message += `   CPF: ${formatCPF(patient.cpf)}\n`;
    message += `   Diagnóstico: ${patient.diagnosis}\n`;
    message += `   Última atualização: ${formatDateOnly(patient.updatedAt)}\n\n`;
  });

  return message.trim();
}

/**
 * Formata CPF
 */
function formatCPF(cpf) {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata dados do paciente
 */
function formatPatientData(patient) {
  let message = `👤 *DADOS DO PACIENTE*\n\n`;
  message += `*Nome:* ${patient.name}\n`;
  message += `*CPF:* ${formatCPF(patient.cpf)}\n`;
  message += `*Diagnóstico:* ${patient.diagnosis}\n\n`;
  message += `📊 *Status Atual:*\n${patient.currentStatus}\n\n`;
  message += `📅 *Cadastrado em:* ${formatDateOnly(patient.createdAt)}\n`;
  message += `🔄 *Última atualização:* ${formatDateOnly(patient.updatedAt)}\n`;
  message += `📝 *Total de evoluções:* ${patient.history.length}`;
  
  return message;
}

/**
 * Formata histórico de evolução
 */
function formatEvolutionHistory(patient) {
  if (!patient.history || patient.history.length === 0) {
    return '❌ Nenhuma evolução registrada.';
  }

  let message = `📈 *HISTÓRICO DE EVOLUÇÃO*\n`;
  message += `Paciente: ${patient.name}\n\n`;

  patient.history.forEach((evolution, index) => {
    message += `*${index + 1}. ${formatDateOnly(evolution.date)}*\n`;
    message += `${evolution.description}\n\n`;
  });

  return message.trim();
}

/**
 * Formata última evolução
 */
function formatLastEvolution(patient) {
  if (!patient.history || patient.history.length === 0) {
    return '❌ Nenhuma evolução registrada.';
  }

  const lastEvolution = patient.history[patient.history.length - 1];
  
  let message = `📊 *ÚLTIMA EVOLUÇÃO*\n`;
  message += `Paciente: ${patient.name}\n`;
  message += `Data: ${formatDateOnly(lastEvolution.date)}\n\n`;
  message += `${lastEvolution.description}`;

  return message;
}

/**
 * Trunca texto longo
 */
function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * Gera ID único simples
 */
function generateSimpleId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Delay/sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Verifica se string é vazia ou apenas espaços
 */
function isEmpty(str) {
  return !str || str.trim().length === 0;
}

/**
 * Capitaliza primeira letra
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Remove acentos
 */
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Formata número de telefone
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 13) {
    return `+${cleaned.substring(0, 2)} (${cleaned.substring(2, 4)}) ${cleaned.substring(4, 9)}-${cleaned.substring(9)}`;
  }
  return phone;
}

module.exports = {
  formatDate,
  formatDateOnly,
  daysDifference,
  formatPatientList,
  formatCPF,
  formatPatientData,
  formatEvolutionHistory,
  formatLastEvolution,
  truncateText,
  generateSimpleId,
  sleep,
  isEmpty,
  capitalize,
  removeAccents,
  formatPhoneNumber
};

