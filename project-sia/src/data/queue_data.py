from typing import List, Dict, Any
import httpx
from datetime import datetime, timedelta
from ..config.settings import get_settings

settings = get_settings()

class QueueDataFetcher:
    def __init__(self):
        self.api_base_url = settings.BACKEND_API_URL
        self.client = httpx.AsyncClient(timeout=30.0)
    
    async def get_historical_queue_data(
        self,
        queue_id: int,
        start_date: datetime = None,
        end_date: datetime = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch historical queue data from the backend API
        Instead of direct database access, we use the backend's API
        """
        if not start_date:
            start_date = datetime.now() - timedelta(days=30)
        if not end_date:
            end_date = datetime.now()
            
        params = {
            "queue_id": queue_id,
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat()
        }
        
        try:
            response = await self.client.get(
                f"{self.api_base_url}/queues/metrics",
                params=params
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error fetching queue data: {e}")
            return []
    
    async def get_current_queue_state(self, queue_id: int) -> Dict[str, Any]:
        """
        Get current state of a specific queue
        """
        try:
            response = await self.client.get(
                f"{self.api_base_url}/queues/{queue_id}/state"
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"Error fetching queue state: {e}")
            return {}
    
    async def close(self):
        await self.client.aclose() 