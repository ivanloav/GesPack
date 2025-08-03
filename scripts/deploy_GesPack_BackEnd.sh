#!/bin/bash

# Variables de configuración
LOCAL_PATH="/Users/ivan/Documents/VSCode-POT/GesPack/GesPack-BackEnd"
REMOTE_USER="ivan"
REMOTE_HOST="192.168.50.14"
REMOTE_PATH="/home/ivan/gespack-app/backend"
SSH_KEY="/Users/ivan/.ssh/id_ed25519"

# Rsync usando la clave
rsync -avz --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "deploy_GesPack_BackEnd.sh" \
  -e "ssh -i $SSH_KEY" \
  "$LOCAL_PATH/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# SSH usando la clave
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_PATH && ./deploy_GesPack_BackEnd.sh"