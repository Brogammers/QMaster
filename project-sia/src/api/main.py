from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import torch
import numpy as np

from models.queue_transformer import QueueTransformer

app = FastAPI(
    title="Sia - Queue Intelligence API",
    description="AI-powered queue prediction and recommendations",
    version="0.1.0"
)

class QueuePredictionRequest(BaseModel):
    queue_id: int
    current_length: int
    time_of_day: int  # Hour of day (0-23)
    day_of_week: int  # (0-6)
    historical_wait_times: List[float]
    features: Optional[List[float]] = None

class QueuePredictionResponse(BaseModel):
    estimated_wait_time: float
    confidence_score: float
    recommendations: List[str]

# Load model (in production, use a proper model loading mechanism)
model = QueueTransformer()

@app.post("/predict/wait-time", response_model=QueuePredictionResponse)
async def predict_wait_time(request: QueuePredictionRequest):
    try:
        # Prepare input features
        features = torch.tensor([
            request.current_length,
            request.time_of_day,
            request.day_of_week,
            *request.historical_wait_times[-5:],  # Last 5 wait times
            *(request.features or [])
        ]).float()
        
        # Add batch and sequence dimensions
        features = features.unsqueeze(0).unsqueeze(0)
        
        # Get prediction
        with torch.no_grad():
            prediction = model(features)
            wait_time = prediction.item()
        
        # Simple confidence score based on historical variance
        confidence = 1.0 - np.std(request.historical_wait_times) / np.mean(request.historical_wait_times)
        confidence = max(min(confidence, 1.0), 0.0)
        
        # Generate basic recommendations
        recommendations = []
        if wait_time > 20:
            recommendations.append("Consider opening additional service points")
        if confidence < 0.5:
            recommendations.append("Historical data shows high variability, prediction may be less accurate")
            
        return QueuePredictionResponse(
            estimated_wait_time=wait_time,
            confidence_score=confidence,
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None} 