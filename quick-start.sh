#!/bin/bash

# Script de Inicialização Rápida
# Chatbot Psicológico

echo "=========================================="
echo "🤖 CHATBOT PSICOLÓGICO - QUICK START"
echo "=========================================="
echo ""

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas!"
    echo ""
fi

# Verifica se .env existe
if [ ! -f ".env" ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "Por favor, crie o arquivo .env com as credenciais."
    exit 1
fi

echo "✅ Arquivo .env encontrado"
echo ""

# Exibe informações
echo "📋 INFORMAÇÕES DO PROJETO:"
echo "   - Porta: 3000"
echo "   - Webhook: https://r463sf-3000.csb.app/webhook/whatsapp"
echo "   - Health: https://r463sf-3000.csb.app/webhook/health"
echo ""

# Pergunta se quer testar Twilio
echo "🔍 Deseja testar as credenciais do Twilio? (s/n)"
read -r response

if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
    echo ""
    echo "🧪 Testando credenciais Twilio..."
    node test-twilio.js
    echo ""
fi

# Inicia o servidor
echo "=========================================="
echo "🚀 INICIANDO SERVIDOR..."
echo "=========================================="
echo ""
echo "Para parar o servidor: Ctrl+C"
echo ""

npm start

