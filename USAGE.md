# Manual de Uso - Chatbot Psicológico

## Visão Geral

Sistema de chatbot para acompanhamento psicológico via WhatsApp, utilizando inteligência artificial (OpenAI) para processamento de linguagem natural e Twilio para comunicação.

## Funcionalidades Principais

### 1. Consultar Paciente (CPF)

Busca e exibe informações completas de um paciente.

**Como usar:**
1. Digite `1` no menu principal
2. Informe o CPF do paciente (11 dígitos)
3. Visualize os dados completos

**Exemplo:**
```
Você: 1
Bot: Por favor, informe o CPF do paciente
Você: 12345678900
Bot: [Exibe dados completos da Maria Silva]
```

### 2. Evolução Diária

Visualiza a evolução em tempo real do paciente com análise de IA.

**Como usar:**
1. Digite `2` no menu principal
2. Informe o CPF do paciente
3. Receba análise da evolução diária

**Exemplo:**
```
Você: 2
Bot: Por favor, informe o CPF do paciente
Você: 23456789011
Bot: [Análise da evolução do João Santos]
```

### 3. Gerar Relatório

Cria relatórios clínicos detalhados usando IA.

**Como usar:**
1. Digite `3` no menu principal
2. Informe o CPF do paciente
3. Escolha o tipo de relatório:
   - 1: Diário
   - 2: Semanal
   - 3: Mensal
   - 4: Geral

**Exemplo:**
```
Você: 3
Bot: Por favor, informe o CPF do paciente
Você: 34567890122
Bot: Escolha o tipo de relatório
Você: 4
Bot: [Relatório geral da Ana Costa]
```

### 4. Nova Sessão

Inicia sessão de atendimento com IA para conversação livre.

**Como usar:**
1. Digite `4` no menu principal
2. Informe o CPF do paciente
3. Converse livremente sobre o paciente
4. Digite `FINALIZAR` para encerrar

**Exemplo:**
```
Você: 4
Bot: Por favor, informe o CPF do paciente
Você: 45678901233
Bot: Sessão iniciada com Carlos Oliveira
Você: Como está o progresso do tratamento?
Bot: [Resposta da IA sobre o paciente]
Você: FINALIZAR
Bot: Sessão finalizada
```

### 5. Listar Pacientes

Exibe lista de todos os pacientes cadastrados.

**Como usar:**
1. Digite `5` no menu principal
2. Visualize a lista completa

### 6. Ajuda

Exibe informações de ajuda e instruções.

**Como usar:**
1. Digite `6` no menu principal
2. Ou digite `AJUDA` a qualquer momento

## Comandos Especiais

- **MENU**: Volta ao menu principal a qualquer momento
- **AJUDA**: Exibe ajuda
- **FINALIZAR**: Encerra sessão ativa

## Pacientes Fictícios Cadastrados

### 1. Maria Silva
- **CPF**: 12345678900
- **Diagnóstico**: Transtorno de Ansiedade Generalizada (TAG)
- **Status**: Evolução positiva com técnicas de respiração
- **Evoluções**: 4 registros

### 2. João Santos
- **CPF**: 23456789011
- **Diagnóstico**: Episódio Depressivo Moderado
- **Status**: Resposta positiva à TCC
- **Evoluções**: 5 registros

### 3. Ana Costa
- **CPF**: 34567890122
- **Diagnóstico**: Síndrome do Pânico
- **Status**: Redução de crises com exposição gradual
- **Evoluções**: 6 registros

### 4. Carlos Oliveira
- **CPF**: 45678901233
- **Diagnóstico**: Transtorno Obsessivo-Compulsivo (TOC)
- **Status**: Controle parcial dos rituais compulsivos
- **Evoluções**: 6 registros

### 5. Beatriz Lima
- **CPF**: 56789012344
- **Diagnóstico**: Transtorno de Estresse Pós-Traumático (TEPT)
- **Status**: Processamento gradual do trauma com EMDR
- **Evoluções**: 7 registros

## Fluxo de Conversação

```
Início
  ↓
Enviar "MENU"
  ↓
Menu Principal (opções 1-6)
  ↓
Selecionar opção
  ↓
Seguir instruções
  ↓
Receber resposta
  ↓
Voltar ao menu ou continuar
```

## Exemplos de Uso Completo

### Exemplo 1: Consulta Rápida

```
Você: MENU
Bot: [Menu principal]
Você: 1
Bot: Informe o CPF
Você: 12345678900
Bot: [Dados da Maria Silva]
Você: MENU
Bot: [Menu principal]
```

### Exemplo 2: Sessão de Atendimento

```
Você: MENU
Bot: [Menu principal]
Você: 4
Bot: Informe o CPF
Você: 23456789011
Bot: Sessão iniciada com João Santos
Você: Quais técnicas estão sendo usadas?
Bot: [Resposta sobre TCC e ativação comportamental]
Você: Como está o humor dele?
Bot: [Análise do humor baseada no histórico]
Você: FINALIZAR
Bot: Sessão finalizada (5 minutos)
```

### Exemplo 3: Geração de Relatório

```
Você: MENU
Bot: [Menu principal]
Você: 3
Bot: Informe o CPF
Você: 34567890122
Bot: Escolha o tipo de relatório
Você: 1
Bot: [Relatório diário da Ana Costa]
```

## Dicas de Uso

1. **Sempre comece com MENU** para ver as opções disponíveis
2. **Use CPF sem formatação** (apenas números) ou com formatação (123.456.789-00)
3. **Em sessões, seja específico** nas perguntas para respostas mais precisas
4. **Finalize sessões** quando terminar para liberar recursos
5. **Use MENU** para cancelar operações e voltar ao início

## Limitações

- O chatbot **não faz diagnósticos** ou prescreve tratamentos
- Apenas **auxilia profissionais** no acompanhamento
- Recomenda **consulta com profissional** quando necessário
- Dados são **fictícios** para demonstração

## Segurança

- CPFs são validados antes de qualquer operação
- Mensagens são sanitizadas para evitar injeção
- Sessões são isoladas por número de telefone
- Logs de auditoria são mantidos

## Suporte

Para dúvidas ou problemas:
1. Digite `AJUDA` no chatbot
2. Verifique este manual
3. Consulte o arquivo DEPLOY.md para questões técnicas

---

**Desenvolvido com:**
- Node.js + Express (Backend)
- OpenAI GPT-4 (IA)
- Twilio WhatsApp API (Mensageria)
- Arquitetura MVC
- Metodologia XP

