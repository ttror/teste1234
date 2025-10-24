/**
 * Constants
 * Constantes e configurações do sistema
 */

module.exports = {
  // Menu do chatbot
  MENU: {
    MAIN: `🤖 *CHATBOT PSICOLÓGICO*

Bem-vindo(a)! Como posso ajudar?

1️⃣ Consultar Paciente (CPF)
2️⃣ Evolução Diária
3️⃣ Gerar Relatório
4️⃣ Nova Sessão
5️⃣ Listar Pacientes
6️⃣ Ajuda

Digite o número da opção desejada.`,

    HELP: `ℹ️ *AJUDA*

*Como usar:*
- Digite o número da opção no menu
- Para consultar paciente, informe o CPF
- Para iniciar sessão, siga as instruções

*Opções disponíveis:*
1. Consultar dados de um paciente
2. Ver evolução diária em tempo real
3. Gerar relatórios clínicos
4. Iniciar nova sessão de atendimento
5. Ver lista de todos os pacientes
6. Exibir esta ajuda

Digite *MENU* a qualquer momento para voltar.`
  },

  // Mensagens do sistema
  MESSAGES: {
    WELCOME: '👋 Olá! Sou o assistente psicológico virtual.',
    INVALID_OPTION: '❌ Opção inválida. Digite *MENU* para ver as opções.',
    CPF_REQUEST: '🔍 Por favor, informe o CPF do paciente (apenas números):',
    CPF_INVALID: '❌ CPF inválido. Por favor, informe um CPF válido com 11 dígitos.',
    PATIENT_NOT_FOUND: '❌ Paciente não encontrado. Verifique o CPF e tente novamente.',
    ERROR: '❌ Ocorreu um erro. Por favor, tente novamente.',
    SESSION_STARTED: '✅ Sessão iniciada! Você pode conversar livremente agora.',
    SESSION_ENDED: '✅ Sessão finalizada. Digite *MENU* para voltar ao menu principal.',
    REPORT_GENERATED: '✅ Relatório gerado com sucesso!'
  },

  // Estados da conversação
  CONVERSATION_STATE: {
    MENU: 'menu',
    WAITING_CPF: 'waiting_cpf',
    WAITING_OPTION: 'waiting_option',
    IN_SESSION: 'in_session',
    GENERATING_REPORT: 'generating_report'
  },

  // Tipos de relatório
  REPORT_TYPES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    GENERAL: 'general'
  },

  // Configurações OpenAI
  OPENAI: {
    MODEL: 'gpt-4',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7,
    SYSTEM_PROMPT: `Você é um assistente psicológico virtual especializado em saúde mental. 
Seu papel é:
- Auxiliar profissionais de psicologia no acompanhamento de pacientes
- Fornecer informações sobre evolução clínica
- Gerar relatórios e análises
- Manter conversas empáticas e profissionais
- NUNCA fazer diagnósticos ou prescrever tratamentos
- SEMPRE recomendar consulta com profissional quando necessário

Seja empático, profissional e objetivo nas respostas.`
  },

  // Validações
  VALIDATION: {
    CPF_LENGTH: 11,
    MIN_MESSAGE_LENGTH: 1,
    MAX_MESSAGE_LENGTH: 1000
  }
};

