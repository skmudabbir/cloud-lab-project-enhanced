#!/usr/bin/env bash
set -euo pipefail
kubectl apply -k kubernetes/overlays/staging
