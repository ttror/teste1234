/**
 * Message Templates (View)
 * Templates de mensagens para WhatsApp
 */

const { formatCPF, formatDateOnly, formatDate } = require('../utils/helpers');

/**
 * Template de boas-vindas
 */
function welcomeMessage(userName = '') {
  const greeting = userName ? `Olá, ${userName}!` : 'Olá!';
  return `👋 ${greeting}

Bem-vindo(a) ao *Chatbot Psicológico*!

Sou seu assistente virtual para acompanhamento de pacientes e gestão de informações clínicas.

Digite *MENU* para começar.`;
}

/**
 * Template do menu principal
 */
function mainMenu() {
  return `🤖 *CHATBOT PSICOLÓGICO*

Como posso ajudar?

1️⃣ Consultar Paciente (CPF)
2️⃣ Evolução Diária
3️⃣ Gerar Relatório
4️⃣ Nova Sessão
5️⃣ Listar Pacientes
6️⃣ Ajuda

Digite o número da opção desejada.`;
}

/**
 * Template de ajuda
 */
function helpMessage() {
  return `ℹ️ *AJUDA*

*Como usar:*
• Digite o número da opção no menu
• Para consultar paciente, informe o CPF
• Para iniciar sessão, siga as instruções

*Opções disponíveis:*

1️⃣ *Consultar Paciente*
   Busca informações completas de um paciente pelo CPF

2️⃣ *Evolução Diária*
   Visualiza evolução em tempo real do paciente

3️⃣ *Gerar Relatório*
   Cria relatórios clínicos detalhados

4️⃣ *Nova Sessão*
   Inicia sessão de atendimento com IA

5️⃣ *Listar Pacientes*
   Mostra todos os pacientes cadastrados

6️⃣ *Ajuda*
   Exibe esta mensagem de ajuda

Digite *MENU* a qualquer momento para voltar ao menu principal.`;
}

/**
 * Template de solicitação de CPF
 */
function requestCPF() {
  return `🔍 *CONSULTAR PACIENTE*

Por favor, informe o CPF do paciente:

Formato: 12345678900 ou 123.456.789-00

Digite *MENU* para cancelar.`;
}

/**
 * Template de CPF inválido
 */
function invalidCPF() {
  return `❌ *CPF INVÁLIDO*

O CPF informado não é válido.

Por favor, informe um CPF válido com 11 dígitos.

Exemplo: 12345678900`;
}

/**
 * Template de paciente não encontrado
 */
function patientNotFound(cpf) {
  return `❌ *PACIENTE NÃO ENCONTRADO*

Não foi encontrado nenhum paciente com o CPF: ${formatCPF(cpf)}

Verifique o CPF e tente novamente ou digite *MENU* para voltar.`;
}

/**
 * Template de dados do paciente
 */
function patientData(patient) {
  return `👤 *DADOS DO PACIENTE*

*Nome:* ${patient.name}
*CPF:* ${formatCPF(patient.cpf)}
*Diagnóstico:* ${patient.diagnosis}

📊 *Status Atual:*
${patient.currentStatus}

📅 *Cadastrado em:* ${formatDateOnly(patient.createdAt)}
🔄 *Última atualização:* ${formatDateOnly(patient.updatedAt)}
📝 *Total de evoluções:* ${patient.history.length}

Digite *MENU* para voltar.`;
}

/**
 * Template de histórico de evolução
 */
function evolutionHistory(patient) {
  let message = `📈 *HISTÓRICO DE EVOLUÇÃO*\n\n`;
  message += `*Paciente:* ${patient.name}\n`;
  message += `*CPF:* ${formatCPF(patient.cpf)}\n\n`;
  message += `───────────────────\n\n`;

  if (!patient.history || patient.history.length === 0) {
    message += `❌ Nenhuma evolução registrada.\n\n`;
  } else {
    patient.history.forEach((evolution, index) => {
      message += `*${index + 1}. ${formatDateOnly(evolution.date)}*\n`;
      message += `${evolution.description}\n\n`;
      if (index < patient.history.length - 1) {
        message += `───────────────────\n\n`;
      }
    });
  }

  message += `Digite *MENU* para voltar.`;
  return message;
}

/**
 * Template de última evolução
 */
function lastEvolution(patient) {
  if (!patient.history || patient.history.length === 0) {
    return `❌ *NENHUMA EVOLUÇÃO REGISTRADA*

O paciente ${patient.name} ainda não possui evoluções registradas.

Digite *MENU* para voltar.`;
  }

  const evolution = patient.history[patient.history.length - 1];
  
  return `📊 *ÚLTIMA EVOLUÇÃO*

*Paciente:* ${patient.name}
*Data:* ${formatDateOnly(evolution.date)}

${evolution.description}

Digite *MENU* para voltar.`;
}

/**
 * Template de relatório
 */
function reportMessage(report) {
  return `📋 *RELATÓRIO GERADO*

*Tipo:* ${report.type}
*Data:* ${formatDate(report.createdAt)}
*Paciente CPF:* ${formatCPF(report.patientCpf)}

───────────────────

${report.content}

───────────────────

*ID do Relatório:* ${report.id}

Digite *MENU* para voltar.`;
}

/**
 * Template de lista de pacientes
 */
function patientList(patients) {
  if (!patients || patients.length === 0) {
    return `❌ *NENHUM PACIENTE CADASTRADO*

Não há pacientes cadastrados no sistema.

Digite *MENU* para voltar.`;
  }

  let message = `📋 *LISTA DE PACIENTES*\n\n`;
  message += `Total: ${patients.length} paciente(s)\n\n`;
  message += `───────────────────\n\n`;

  patients.forEach((patient, index) => {
    message += `*${index + 1}. ${patient.name}*\n`;
    message += `CPF: ${formatCPF(patient.cpf)}\n`;
    message += `Diagnóstico: ${patient.diagnosis}\n`;
    message += `Última atualização: ${formatDateOnly(patient.updatedAt)}\n\n`;
  });

  message += `Digite *MENU* para voltar.`;
  return message;
}

/**
 * Template de sessão iniciada
 */
function sessionStarted(patientName) {
  return `✅ *SESSÃO INICIADA*

Sessão de atendimento iniciada com sucesso!

*Paciente:* ${patientName}

Você pode conversar livremente agora. Faça perguntas sobre o paciente ou solicite análises.

Digite *FINALIZAR* para encerrar a sessão.`;
}

/**
 * Template de sessão finalizada
 */
function sessionEnded(duration) {
  return `✅ *SESSÃO FINALIZADA*

A sessão foi encerrada com sucesso.

*Duração:* ${duration} minuto(s)

Digite *MENU* para voltar ao menu principal.`;
}

/**
 * Template de erro genérico
 */
function errorMessage(error = '') {
  const errorText = error ? `\n\nDetalhes: ${error}` : '';
  return `❌ *ERRO*

Ocorreu um erro ao processar sua solicitação.${errorText}

Por favor, tente novamente ou digite *MENU* para voltar.`;
}

/**
 * Template de opção inválida
 */
function invalidOption() {
  return `❌ *OPÇÃO INVÁLIDA*

Por favor, escolha uma opção válida do menu (1-6).

Digite *MENU* para ver as opções novamente.`;
}

/**
 * Template de processando
 */
function processingMessage() {
  return `⏳ Processando sua solicitação...

Por favor, aguarde um momento.`;
}

/**
 * Template de escolha de tipo de relatório
 */
function chooseReportType() {
  return `📋 *GERAR RELATÓRIO*

Escolha o tipo de relatório:

1️⃣ Relatório Diário
2️⃣ Relatório Semanal
3️⃣ Relatório Mensal
4️⃣ Relatório Geral

Digite o número da opção ou *MENU* para cancelar.`;
}

module.exports = {
  welcomeMessage,
  mainMenu,
  helpMessage,
  requestCPF,
  invalidCPF,
  patientNotFound,
  patientData,
  evolutionHistory,
  lastEvolution,
  reportMessage,
  patientList,
  sessionStarted,
  sessionEnded,
  errorMessage,
  invalidOption,
  processingMessage,
  chooseReportType
};

