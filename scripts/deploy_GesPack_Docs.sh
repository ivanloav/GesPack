#!/bin/bash

# Variables de configuración
LOCAL_PATH="/Users/ivan/Documents/VSCode-POT/GesPack/docs"
REMOTE_USER="ivan"
REMOTE_HOST="192.168.50.14"
REMOTE_PATH="/home/ivan/gespack-app/docs"
SSH_KEY="/Users/ivan/.ssh/id_ed25519"

# 🔍 Verificar que existe la carpeta
if [ ! -d "$LOCAL_PATH" ]; then
  echo "❌ ERROR: La carpeta $LOCAL_PATH no existe."
  exit 1
fi

# 🔧 Paso 1: Instalar dependencias si falta node_modules
cd "$LOCAL_PATH" || exit 1

if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias (npm install)..."
  npm install
else
  echo "✅ Dependencias ya instaladas."
fi

# 🔧 Paso 2: Build de la documentación
echo "🔨 Ejecutando 'npm run build'..."
npm run build || { echo "❌ Fallo al ejecutar build"; exit 1; }

# 🔄 Paso 3: Rsync al servidor
echo "🚀 Subiendo contenido a $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "deploy_GesPack_Docs.sh" \
  -e "ssh -i $SSH_KEY" \
  "$LOCAL_PATH/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# 🚀 Paso 4: Reconstrucción remota del contenedor
echo "🔁 Reconstruyendo contenedor 'docs' en el servidor..."
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" << EOF
cd $REMOTE_PATH
# 🔧 Si necesitas limpieza completa, descomenta las siguientes líneas:
# docker compose -f ~/gespack-app/docker-compose.yml down
# sleep 2
docker compose -f ~/gespack-app/docker-compose.yml up -d --build docs
EOF

echo "✅ Despliegue completado correctamente."