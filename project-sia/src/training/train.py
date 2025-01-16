import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv

from models.queue_transformer import QueueTransformer

load_dotenv()

class QueueDataset(Dataset):
    def __init__(self, features, targets):
        self.features = torch.FloatTensor(features)
        self.targets = torch.FloatTensor(targets)
    
    def __len__(self):
        return len(self.features)
    
    def __getitem__(self, idx):
        return self.features[idx], self.targets[idx]

def load_data_from_mysql():
    """Load historical queue data from MySQL database"""
    connection_string = os.getenv("MYSQL_CONNECTION_STRING")
    engine = create_engine(connection_string)
    
    query = """
    SELECT 
        q.queue_length,
        q.wait_time,
        HOUR(q.timestamp) as time_of_day,
        WEEKDAY(q.timestamp) as day_of_week,
        q.service_point_count,
        -- Add more relevant features
    FROM queue_metrics q
    ORDER BY q.timestamp
    """
    
    df = pd.read_sql(query, engine)
    return df

def prepare_sequences(df, sequence_length=5):
    """Prepare sequential data for the transformer"""
    features, targets = [], []
    
    for i in range(len(df) - sequence_length):
        seq = df.iloc[i:i+sequence_length]
        target = df.iloc[i+sequence_length]["wait_time"]
        
        # Create feature vector for each timestep
        feature_seq = seq[[
            "queue_length",
            "time_of_day",
            "day_of_week",
            "service_point_count"
        ]].values
        
        features.append(feature_seq)
        targets.append(target)
    
    return features, targets

def train_model(model, train_loader, val_loader, epochs=10, lr=0.001):
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)
    
    best_val_loss = float('inf')
    
    for epoch in range(epochs):
        # Training
        model.train()
        train_loss = 0
        for batch_features, batch_targets in train_loader:
            optimizer.zero_grad()
            predictions = model(batch_features).squeeze()
            loss = criterion(predictions, batch_targets)
            loss.backward()
            optimizer.step()
            train_loss += loss.item()
        
        # Validation
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch_features, batch_targets in val_loader:
                predictions = model(batch_features).squeeze()
                val_loss += criterion(predictions, batch_targets).item()
        
        print(f"Epoch {epoch+1}/{epochs}")
        print(f"Training Loss: {train_loss/len(train_loader):.4f}")
        print(f"Validation Loss: {val_loss/len(val_loader):.4f}")
        
        # Save best model
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), "models/best_model.pth")

def main():
    # Load and prepare data
    df = load_data_from_mysql()
    features, targets = prepare_sequences(df)
    
    # Split data
    split_idx = int(len(features) * 0.8)
    train_features, train_targets = features[:split_idx], targets[:split_idx]
    val_features, val_targets = features[split_idx:], targets[split_idx:]
    
    # Create datasets and dataloaders
    train_dataset = QueueDataset(train_features, train_targets)
    val_dataset = QueueDataset(val_features, val_targets)
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)
    
    # Initialize and train model
    model = QueueTransformer()
    train_model(model, train_loader, val_loader)

if __name__ == "__main__":
    main() 