#!/bin/bash

# Variables de configuración
LOCAL_PATH="/Users/ivan/Documents/VSCode-POT/GesPack/backend"
REMOTE_USER="ivan"
REMOTE_HOST="192.168.50.14"
REMOTE_PATH="/home/ivan/gespack-app/backend"
SSH_KEY="/Users/ivan/.ssh/id_ed25519"

# 🔍 Verificar que existe la carpeta local
if [ ! -d "$LOCAL_PATH" ]; then
  echo "❌ ERROR: La carpeta $LOCAL_PATH no existe."
  exit 1
fi

# 📦 Verificar node_modules e instalar si es necesario
cd "$LOCAL_PATH" || exit 1

if [ ! -d "node_modules" ]; then
  echo "📦 Ejecutando npm install..."
  npm install
else
  echo "✅ Dependencias ya instaladas."
fi

# 🔄 Rsync hacia el servidor
echo "🚀 Sincronizando backend con $REMOTE_USER@$REMOTE_HOST..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "deploy_GesPack_BackEnd.sh" \
  -e "ssh -i $SSH_KEY" \
  "$LOCAL_PATH/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# 🚀 Reconstruir el contenedor en el servidor
echo "🔁 Reconstruyendo contenedor 'backend' en el servidor..."
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" << EOF
cd $REMOTE_PATH
# 🔧 Si necesitas limpieza completa, descomenta las siguientes líneas:
# docker compose -f ~/gespack-app/docker-compose.yml down
# sleep 2
docker compose -f ~/gespack-app/docker-compose.yml up -d --build backend
EOF

echo "✅ Backend desplegado correctamente."