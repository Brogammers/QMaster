import torch
import torch.nn as nn

class QueueTransformer(nn.Module):
  def __init__(
    self,
    input_dim: int = 10,  # Number of features
    d_model: int = 64,    # Embedding dimension
    nhead: int = 4,       # Number of attention heads
    num_layers: int = 2,  # Number of transformer layers
    dropout: float = 0.1
  ):
    super().__init__()
    
    self.input_projection = nn.Linear(input_dim, d_model)
    
    encoder_layer = nn.TransformerEncoderLayer(
      d_model=d_model,
      nhead=nhead,
      dropout=dropout,
      batch_first=True
    )
    self.transformer_encoder = nn.TransformerEncoder(
      encoder_layer,
      num_layers=num_layers
    )
    
    self.output_projection = nn.Linear(d_model, 1)  # Predict wait time
      
  def forward(self, x: torch.Tensor) -> torch.Tensor:
    # x shape: (batch_size, sequence_length, input_dim)
    x = self.input_projection(x)
    x = self.transformer_encoder(x)
    # Take the last sequence element for prediction
    x = x[:, -1, :]
    return self.output_projection(x) 