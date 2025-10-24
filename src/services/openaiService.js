/**
 * OpenAI Service
 * Integração com API da OpenAI
 */

const OpenAI = require('openai');
const { OPENAI } = require('../config/constants');

class OpenAIService {
  constructor() {
    // Verifica se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️  OPENAI_API_KEY não configurada. Algumas funcionalidades estarão limitadas.');
      this.client = null;
    } else {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }

  /**
   * Gera resposta do chatbot usando OpenAI
   */
  async generateResponse(messages, systemPrompt = OPENAI.SYSTEM_PROMPT) {
    try {
      if (!this.client) {
        throw new Error('OpenAI não configurado. Verifique a API key.');
      }
      
      const completion = await this.client.chat.completions.create({
        model: OPENAI.MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: OPENAI.MAX_TOKENS,
        temperature: OPENAI.TEMPERATURE
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao gerar resposta OpenAI:', error);
      throw new Error('Não foi possível gerar resposta no momento.');
    }
  }

  /**
   * Analisa intenção do usuário
   */
  async analyzeIntent(userMessage) {
    try {
      if (!this.client) {
        return 'conversa_livre';
      }
      
      const prompt = `Analise a seguinte mensagem e identifique a intenção do usuário.
Retorne apenas uma das opções: menu, consultar_paciente, evolucao, relatorio, nova_sessao, listar_pacientes, ajuda, conversa_livre

Mensagem: "${userMessage}"

Intenção:`;

      const completion = await this.client.chat.completions.create({
        model: OPENAI.MODEL,
        messages: [
          { role: 'system', content: 'Você é um analisador de intenções.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 50,
        temperature: 0.3
      });

      return completion.choices[0].message.content.trim().toLowerCase();
    } catch (error) {
      console.error('Erro ao analisar intenção:', error);
      return 'conversa_livre';
    }
  }

  /**
   * Gera relatório clínico usando IA
   */
  async generateReport(patient, reportType) {
    try {
      if (!this.client) {
        throw new Error('OpenAI não configurado. Verifique a API key.');
      }
      
      const historyText = patient.history
        .map((h, i) => `${i + 1}. ${new Date(h.date).toLocaleDateString('pt-BR')}: ${h.description}`)
        .join('\n');

      const prompt = `Gere um relatório ${reportType} detalhado para o seguinte paciente:

Nome: ${patient.name}
CPF: ${patient.cpf}
Diagnóstico: ${patient.diagnosis}
Status Atual: ${patient.currentStatus}

Histórico de Evolução:
${historyText}

Por favor, gere um relatório profissional incluindo:
1. Resumo do caso
2. Evolução clínica
3. Análise do progresso
4. Recomendações

Formato: Texto profissional para uso clínico.`;

      const completion = await this.client.chat.completions.create({
        model: OPENAI.MODEL,
        messages: [
          { 
            role: 'system', 
            content: 'Você é um psicólogo especializado em gerar relatórios clínicos profissionais.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      throw new Error('Não foi possível gerar o relatório no momento.');
    }
  }

  /**
   * Gera resumo de evolução diária
   */
  async generateDailyEvolution(patient) {
    try {
      if (!this.client) {
        throw new Error('OpenAI não configurado. Verifique a API key.');
      }
      
      const lastEvolution = patient.history[patient.history.length - 1];
      const previousEvolution = patient.history[patient.history.length - 2];

      const prompt = `Analise a evolução recente do paciente e gere um resumo:

Paciente: ${patient.name}
Diagnóstico: ${patient.diagnosis}

Evolução Anterior:
${previousEvolution ? previousEvolution.description : 'Não disponível'}

Evolução Mais Recente:
${lastEvolution.description}

Status Atual:
${patient.currentStatus}

Gere um resumo objetivo da evolução diária, destacando mudanças e progressos.`;

      const completion = await this.client.chat.completions.create({
        model: OPENAI.MODEL,
        messages: [
          { 
            role: 'system', 
            content: 'Você é um psicólogo analisando evolução clínica.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.6
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao gerar evolução diária:', error);
      throw new Error('Não foi possível gerar a evolução diária no momento.');
    }
  }

  /**
   * Responde pergunta sobre paciente
   */
  async answerPatientQuestion(patient, question) {
    try {
      if (!this.client) {
        throw new Error('OpenAI não configurado. Verifique a API key.');
      }
      
      const historyText = patient.history
        .map((h, i) => `${i + 1}. ${new Date(h.date).toLocaleDateString('pt-BR')}: ${h.description}`)
        .join('\n');

      const prompt = `Com base nas informações do paciente, responda a seguinte pergunta:

Paciente: ${patient.name}
Diagnóstico: ${patient.diagnosis}
Status Atual: ${patient.currentStatus}

Histórico:
${historyText}

Pergunta: ${question}

Responda de forma profissional e objetiva.`;

      const completion = await this.client.chat.completions.create({
        model: OPENAI.MODEL,
        messages: [
          { 
            role: 'system', 
            content: 'Você é um assistente psicológico respondendo perguntas sobre pacientes.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 400,
        temperature: 0.7
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao responder pergunta:', error);
      throw new Error('Não foi possível responder a pergunta no momento.');
    }
  }
}

module.exports = new OpenAIService();

