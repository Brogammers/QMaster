from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
  # API Configuration
  API_PREFIX: str = "/api/v1"  # Matching backend server prefix
  PROJECT_NAME: str = "Sia"
  VERSION: str = "0.1.0"
  
  # Backend API Configuration
  BACKEND_API_URL: str = "http://localhost:8080/api/v1"  # Backend server URL with prefix
  
  # Since you don't manage the backend, these should be provided by backend team
  MYSQL_HOST: str = "localhost"  # Get from backend team
  MYSQL_PORT: int = 3306        # Get from backend team
  MYSQL_USER: str = "root"          # Get from backend team
  MYSQL_PASSWORD: str = "123456789"      # Get from backend team
  MYSQL_DATABASE: str = "test_db"      # Get from backend team
  
  # Model Settings
  MODEL_PATH: str = "models/best_model.pth"
  
  class Config:
    env_file = ".env"
    case_sensitive = True

@lru_cache()
def get_settings():
  return Settings() 