import torch
import torch.nn as nn
import numpy as np
from typing import Dict, List, Optional, Tuple
import re

class IntentClassifier(nn.Module):
  """Lightweight intent classification model"""
  def __init__(self, vocab_size: int, embedding_dim: int = 64, hidden_dim: int = 32):
    super().__init__()
    self.embedding = nn.Embedding(vocab_size, embedding_dim)
    self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True, bidirectional=True)
    self.attention = nn.Linear(hidden_dim * 2, 1)
    self.classifier = nn.Linear(hidden_dim * 2, 8)  # 8 main intent categories
    
  def forward(self, x: torch.Tensor) -> torch.Tensor:
    embedded = self.embedding(x)
    lstm_out, _ = self.lstm(embedded)
    attention_weights = torch.softmax(self.attention(lstm_out), dim=1)
    attended = torch.sum(attention_weights * lstm_out, dim=1)
    return self.classifier(attended)

class ParameterExtractor(nn.Module):
  """Extracts key parameters from user queries"""
  def __init__(self, vocab_size: int, embedding_dim: int = 64):
    super().__init__()
    self.embedding = nn.Embedding(vocab_size, embedding_dim)
    self.conv1 = nn.Conv1d(embedding_dim, 32, kernel_size=3, padding=1)
    self.conv2 = nn.Conv1d(32, 16, kernel_size=3, padding=1)
    self.parameter_classifier = nn.Linear(16, 5)  # location, service_type, time, etc.
    
  def forward(self, x: torch.Tensor) -> torch.Tensor:
    embedded = self.embedding(x)
    embedded = embedded.transpose(1, 2)
    conv1_out = torch.relu(self.conv1(embedded))
    conv2_out = torch.relu(self.conv2(conv1_out))
    pooled = torch.max(conv2_out, dim=2)[0]
    return self.parameter_classifier(pooled)

class SiaCore:
  """
  SiaCore: Lightweight Hybrid LLM for Queue Management
  Combines rule-based logic with efficient neural components
  """
  def __init__(self, vocab_size: int = 10000):
    self.intent_classifier = IntentClassifier(vocab_size)
    self.parameter_extractor = ParameterExtractor(vocab_size)
    self.response_templates = self._load_response_templates()
    self.off_topic_redirects = self._load_redirects()
    
  def _load_response_templates(self) -> Dict[str, List[str]]:
    return {
      "queue_inquiry": [
        "Based on current data, {location} has {wait_time} minutes average wait time for {service_type}.",
        "I found a {service_type} in {location} with only {wait_time} minutes wait time.",
        "The best option for {service_type} in {location} has a {wait_time} minute queue."
      ],
      "recommendation": [
        "I recommend trying {name} in {location}. Current wait time is {wait_time} minutes.",
        "Your best bet would be {name} at {location}, with just {wait_time} minutes wait.",
        "For minimal waiting, head to {name} in {location} ({wait_time} min queue)."
      ],
      "clarification": [
        "Could you specify which area you're interested in? This helps me find the best options.",
        "What type of service are you looking for specifically? This will help me narrow down the choices.",
        "To give you the most accurate recommendation, could you tell me your preferred location?"
      ],
      "gratitude": [
        "You're very welcome! Always here to help you skip the Q! 😊",
        "My pleasure! That's what I'm here Q-for! 🌟",
        "Anytime! Let's keep your time in the Q to a minimum! ⏱️"
      ],
      "off_topic": [
        "I see what you mean! Speaking of waiting times, have you tried our queue prediction feature?",
        "That's interesting! While we're chatting, would you like to know about any nearby queues?",
        "I appreciate your question! By the way, I can help you find the shortest queues in your area."
      ]
    }
    
  def _load_redirects(self) -> List[str]:
    return [
      "While I'd love to chat about that, I'm best at helping you save time in queues! Want to know about wait times nearby?",
      "Interesting topic! Though my specialty is queue management - can I help you find the shortest wait times around?",
      "I may not be the best at general chat, but I'm excellent at finding you the shortest queues! Would you like to try that?"
    ]
    
  def _extract_parameters(self, text: str) -> Dict[str, str]:
    # Rule-based parameter extraction backed by neural verification
    params = {}
    # Location extraction
    location_match = re.search(r'in\s+([A-Za-z\s]+)', text)
    if location_match:
      params['location'] = location_match.group(1).strip()
    
    # Service type extraction
    service_types = ['clinic', 'restaurant', 'bank', 'repair shop', 'store']
    for service in service_types:
      if service in text.lower():
        params['service_type'] = service
        break
        
    return params
    
  def _format_sql_query(self, params: Dict[str, str]) -> str:
    """Generates SQL query based on extracted parameters"""
    base_query = """
    SELECT 
      q.name,
      q.location,
      q.current_wait_time,
      q.service_type
    FROM queues q
    WHERE 1=1
    """
    
    if 'location' in params:
      base_query += f"\n  AND q.location LIKE '%{params['location']}%'"
    if 'service_type' in params:
      base_query += f"\n  AND q.service_type = '{params['service_type']}'"
      
    base_query += "\nORDER BY q.current_wait_time ASC LIMIT 3"
    
    return base_query
    
  async def process_query(self, text: str, db_connection) -> str:
    """Main query processing pipeline"""
    # 1. Classify intent
    intent_logits = self.intent_classifier(self._tokenize(text))
    intent = self._get_intent_label(intent_logits)
    
    # 2. Handle off-topic queries
    if intent == "off_topic":
      return np.random.choice(self.off_topic_redirects)
      
    # 3. Handle gratitude
    if intent == "gratitude":
      return np.random.choice(self.response_templates["gratitude"])
      
    # 4. Extract parameters
    params = self._extract_parameters(text)
    
    # 5. Request clarification if needed
    if not params:
      return np.random.choice(self.response_templates["clarification"])
      
    # 6. Query database
    query = self._format_sql_query(params)
    results = await db_connection.fetch_all(query)
    
    # 7. Format response
    if results:
      template = np.random.choice(self.response_templates["queue_inquiry"])
      return template.format(
        location=results[0]['location'],
        wait_time=results[0]['current_wait_time'],
        service_type=results[0]['service_type']
      )
    else:
      return "I couldn't find any matching queues at the moment. Could you try a different location or service type?"
      
  def _tokenize(self, text: str) -> torch.Tensor:
    """Placeholder for tokenization - implement with actual tokenizer"""
    pass
    
  def _get_intent_label(self, logits: torch.Tensor) -> str:
    """Converts model logits to intent label"""
    pass 