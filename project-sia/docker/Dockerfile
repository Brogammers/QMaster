FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY src/ ./src/
COPY models/ ./models/

# Environment variables
ENV PYTHONPATH=/app
ENV MODEL_PATH=/app/models/best_model.pth

# Expose the port
EXPOSE 9096

# Run the FastAPI application
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "9096"] 