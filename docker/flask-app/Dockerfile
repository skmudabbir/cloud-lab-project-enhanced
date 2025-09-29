# docker/flask-app/Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY src/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/backend/ .

# Create non-root user
RUN useradd -m -u 1000 appuser
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3     CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/health')" || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "app:app"]
