#!/bin/bash

# 🔧 Script de despliegue de NGINX con HTTPS desde Mac a Ubuntu para GesPack
# Ejecutar desde tu Mac cuando solo necesites subir cambios a la configuración NGINX + HTTPS

# ⚖️ Variables de configuración
LOCAL_PATH="/Users/ivan/Documents/VSCode-POT/GesPack/nginx"
REMOTE_USER="ivan"
REMOTE_HOST="192.168.50.14"
REMOTE_PATH="/home/ivan/gespack-app/nginx"
SSH_KEY="/Users/ivan/.ssh/id_ed25519"

# 🔍 Verificar que existe la carpeta local
if [ ! -d "$LOCAL_PATH" ]; then
  echo "❌ ERROR: La carpeta $LOCAL_PATH no existe."
  exit 1
fi

# 🚨 Subir solo NGINX al servidor (incluye default.conf y estructura certbot)
echo "🚀 Subiendo configuración NGINX + HTTPS a $REMOTE_HOST..."
rsync -avz --delete \
  --exclude "*.sh" \
  -e "ssh -i $SSH_KEY" \
  "$LOCAL_PATH/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# 🚀 Reconstruir nginx y renovar certificado SSL
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" << EOF
cd /home/ivan/gespack-app

echo "🔁 Reconstruyendo contenedor nginx..."
docker compose build nginx

echo "📜 Renovando certificados SSL (si aplica)..."
docker compose run --rm certbot

sleep 2

echo "⬆️ Reiniciando nginx con HTTPS..."
docker compose up -d nginx
EOF

echo "✅ NGINX + HTTPS desplegado correctamente."

# Fin
