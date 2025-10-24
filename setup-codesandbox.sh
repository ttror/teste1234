#!/bin/bash

# Script de Setup para CodeSandbox
# Adiciona variável de ambiente com a URL pública

echo "=========================================="
echo "🔧 SETUP CODESANDBOX"
echo "=========================================="
echo ""

# Verifica se está no CodeSandbox
if [ -n "$CODESANDBOX_HOST" ]; then
    echo "✅ CodeSandbox detectado!"
    echo "📍 Host: $CODESANDBOX_HOST"
    echo ""
    
    # Adiciona ao .env se não existir
    if ! grep -q "CODESANDBOX_HOST" .env 2>/dev/null; then
        echo "CODESANDBOX_HOST=$CODESANDBOX_HOST" >> .env
        echo "✅ Variável CODESANDBOX_HOST adicionada ao .env"
    else
        echo "ℹ️  Variável CODESANDBOX_HOST já existe no .env"
    fi
    
    echo ""
    echo "🌐 URL Pública: https://$CODESANDBOX_HOST"
    echo "📱 Webhook: https://$CODESANDBOX_HOST/webhook/whatsapp"
    echo ""
    echo "🔗 Configure esta URL no Twilio Console:"
    echo "   https://$CODESANDBOX_HOST/webhook/whatsapp"
    echo ""
else
    echo "⚠️  CodeSandbox não detectado"
    echo "ℹ️  Usando URL padrão: https://r463sf-3000.csb.app"
    echo ""
    echo "Se você estiver no CodeSandbox, a URL será detectada automaticamente"
    echo "quando o servidor iniciar."
fi

echo "=========================================="
echo ""

