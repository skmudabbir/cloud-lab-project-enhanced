# 1) init & set your identity (once on this machine)
git init
git config user.name "skmudabbir"
git config user.email "mudabbir1187@gmail.com"   # use your GitHub email
git config init.defaultBranch main

# 2) ignore build outputs & binaries
cat > .gitignore <<'EOF'
# Node / React
node_modules/
build/
dist/
*.log

# Python
__pycache__/
*.pyc
.venv/
.env

# Docker
*.pid
db_data/

# IDE/editor
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Artifacts
*.zip
docs/screenshots/
EOF

# (Optional) Use Git LFS for big binaries if you DO commit docx/pptx
git lfs install
git lfs track "*.docx" "*.pptx" "*.png" "*.jpg"

git add .
git commit -m "feat: initial project import (Flask+React, Docker, K8s, Terraform, CI docs)"

