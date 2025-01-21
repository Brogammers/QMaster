# Sia - Queue Intelligence Service

Sia is an AI-powered queue management service that predicts wait times and provides intelligent recommendations for queue optimization. Named after the ancient Egyptian deity of wisdom and perception, Sia aims to bring intelligence to queue management systems.

## Project Structure

```bash
project-sia/
├── docker/                 # Docker configuration files
├── docs/                   # Documentation
├── models/                 # Trained model artifacts
├── notebooks/             # Jupyter notebooks for experimentation
├── src/                   # Source code
│   ├── api/              # FastAPI application
│   ├── models/           # ML model definitions
│   └── training/         # Training pipeline
├── tests/                # Test suite
└── venv/                 # Python virtual environment
```

## Prerequisites

- Python 3.10+
- Docker and Docker Compose
- NVIDIA GPU (optional, but recommended for training)
- MySQL database with queue metrics data

## Quick Start

1. Clone the repository and navigate to the project directory:

   ```bash
   cd project-sia
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your MySQL connection string
   ```

5. Start the services using Docker Compose:

   ```bash
   cd docker
   docker-compose up -d
   ```

The API will be available at `http://localhost:9096`.

## Development Workflow

1. **Data Collection**
   - Ensure your MySQL database contains the required queue metrics
   - The training pipeline will automatically fetch data from the configured database

2. **Model Training**
   - Training can be triggered manually:

     ```bash
     python src/training/train.py
     ```
  
   - Monitor training progress in the logs
   - Best model will be saved to `models/best_model.pth`

3. **API Development**
   - The FastAPI application auto-reloads in development
   - API documentation available at `http://localhost:9096/docs`
   - New endpoints can be added in `src/api/main.py`

4. **Testing**

   ```bash
   pytest tests/
   ```

## Integration with Existing Stack

1. **Mobile App Integration**

   ```typescript
   // In your React Native app
   const predictWaitTime = async (queueId: number) => {
     const response = await fetch('http://your-sia-api:9096/predict/wait-time', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         queue_id: queueId,
         current_length: 10,
         time_of_day: new Date().getHours(),
         day_of_week: new Date().getDay(),
         historical_wait_times: [15, 20, 18, 25, 22],
       }),
     });
     return await response.json();
   };
   ```

2. **Backend Integration**

   ```java
   // In your Spring Boot application
   @Service
   public class QueueService {
       @Value("${sia.api.url}")
       private String siaApiUrl;
       
       public QueuePrediction getPrediction(Long queueId) {
           // Make HTTP request to Sia API
           // Process response
       }
   }
   ```

## Contributing

This project is part of the SIA project and QMaster project and is not open source.

## License

GPL-3.0 License

## Support

For support and questions, please open an issue in the repository. 