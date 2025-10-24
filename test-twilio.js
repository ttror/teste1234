/**
 * Script de Teste do Twilio
 * Verifica se as credenciais estão corretas
 */

require('dotenv').config();
const twilio = require('twilio');

// Credenciais do Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const recipientNumber = process.env.DEFAULT_RECIPIENT;

console.log('='.repeat(60));
console.log('TESTE DE CONFIGURAÇÃO TWILIO');
console.log('='.repeat(60));
console.log('\n📋 Credenciais Carregadas:');
console.log(`Account SID: ${accountSid}`);
console.log(`Auth Token: ${authToken ? authToken.substring(0, 10) + '...' : 'NÃO ENCONTRADO'}`);
console.log(`WhatsApp Number: ${whatsappNumber}`);
console.log(`Recipient: ${recipientNumber}`);
console.log('\n' + '='.repeat(60));

// Cria cliente Twilio
const client = twilio(accountSid, authToken);

// Teste 1: Verificar conta
console.log('\n🔍 Teste 1: Verificando conta Twilio...');
client.api.accounts(accountSid)
  .fetch()
  .then(account => {
    console.log('✅ Conta verificada com sucesso!');
    console.log(`   Nome: ${account.friendlyName}`);
    console.log(`   Status: ${account.status}`);
    console.log(`   Tipo: ${account.type}`);
    
    // Teste 2: Enviar mensagem de teste
    console.log('\n📱 Teste 2: Enviando mensagem de teste...');
    return client.messages.create({
      from: whatsappNumber,
      to: recipientNumber,
      body: '🤖 *TESTE DE CONFIGURAÇÃO*\n\nSeu chatbot psicológico está configurado corretamente!\n\nDigite *MENU* para começar.'
    });
  })
  .then(message => {
    console.log('✅ Mensagem enviada com sucesso!');
    console.log(`   SID: ${message.sid}`);
    console.log(`   Status: ${message.status}`);
    console.log(`   De: ${message.from}`);
    console.log(`   Para: ${message.to}`);
    console.log('\n' + '='.repeat(60));
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('='.repeat(60));
    console.log('\n📝 Próximos passos:');
    console.log('1. Configure o webhook no Twilio Console');
    console.log('2. URL do webhook: https://r463sf-3000.csb.app/webhook/whatsapp');
    console.log('3. Método: POST');
    console.log('4. Teste enviando "MENU" no WhatsApp');
    console.log('\n');
  })
  .catch(error => {
    console.error('\n❌ ERRO:', error.message);
    console.error('\n🔧 Possíveis soluções:');
    console.error('1. Verifique se o Account SID está correto');
    console.error('2. Verifique se o Auth Token está correto');
    console.error('3. Verifique se o WhatsApp Sandbox está ativado');
    console.error('4. Verifique se o número destinatário está no formato correto');
    console.error('\n');
    process.exit(1);
  });

