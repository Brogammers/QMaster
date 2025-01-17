from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import json
from datetime import datetime

router = APIRouter(prefix="/mobile", tags=["mobile"])

class SiaCommand(BaseModel):
    command: str  # Voice/text command
    queue_id: Optional[int] = None
    context: Optional[dict] = None
    user_id: Optional[str] = None
    location: Optional[dict] = None

class SiaResponse(BaseModel):
    message: str  # Text response
    voice_message: Optional[str] = None  # Optional different message for voice
    action: Optional[str] = None  # e.g., "show_queue", "navigate", "predict"
    data: Optional[dict] = None  # Any additional data
    suggestions: List[str] = []  # Quick action suggestions

@router.post("/assistant", response_model=SiaResponse)
async def process_command(command: SiaCommand):
    """Process natural language commands for Sia mobile assistant"""
    try:
        # Basic command processing - expand this with NLP later
        cmd = command.command.lower()
        
        # Queue time prediction
        if "how long" in cmd or "wait time" in cmd or "prediction" in cmd:
            if not command.queue_id:
                return SiaResponse(
                    message="Which queue would you like to know about?",
                    voice_message="Which queue are you interested in?",
                    action="request_queue_selection",
                    suggestions=["Show nearby queues", "Recent queues"]
                )
            
            return SiaResponse(
                message="Based on current data, the estimated wait time is 15 minutes",
                voice_message="I estimate you'll wait about 15 minutes",
                action="show_prediction",
                data={"wait_time": 15, "confidence": 0.85},
                suggestions=["Show details", "Join queue", "Set reminder"]
            )
        
        # Queue recommendations
        elif "recommend" in cmd or "suggest" in cmd or "where should" in cmd:
            return SiaResponse(
                message="Based on current wait times and your location, I recommend Queue #123 at Cairo Festival City",
                voice_message="I found a good queue at Cairo Festival City",
                action="show_recommendation",
                data={
                    "queue_id": 123,
                    "location": "Cairo Festival City",
                    "wait_time": 10
                },
                suggestions=["Show route", "Join queue", "More options"]
            )
        
        # General help
        elif "help" in cmd or "what can you do" in cmd:
            return SiaResponse(
                message="I can help you with:\n- Queue predictions\n- Finding the best queue\n- Queue notifications\n- Wait time updates",
                voice_message="I can help you manage queues, make predictions, and find the best options for you",
                action="show_help",
                suggestions=["Predict wait time", "Find best queue", "Set notification"]
            )
        
        # Default response
        return SiaResponse(
            message="I'm not sure about that. Would you like to know about queue times or get recommendations?",
            voice_message="I didn't catch that. Would you like to know about queues?",
            suggestions=["Check wait time", "Find best queue", "Help"]
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 