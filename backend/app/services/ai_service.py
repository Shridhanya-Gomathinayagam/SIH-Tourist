from typing import Dict, List, Optional
import json
import random
from datetime import datetime, timedelta

class AIService:
    def __init__(self):
        self.safety_model = None
        self.anomaly_model = None
    
    def calculate_ai_safety_score(self, tourist_data: dict, location_data: dict) -> float:
        """Calculate AI-based safety score using location and behavior patterns"""
        # Mock AI calculation - replace with actual ML model
        base_score = 7.0
        
        # Factors affecting safety score
        factors = {
            "time_of_day": self._get_time_factor(),
            "location_safety": self._get_location_safety_factor(location_data),
            "crowd_density": random.uniform(0.8, 1.2),
            "weather_conditions": random.uniform(0.9, 1.1),
            "historical_incidents": random.uniform(0.85, 1.0)
        }
        
        # Calculate weighted score
        for factor_name, factor_value in factors.items():
            base_score *= factor_value
        
        # Ensure score is between 1-10
        return max(1.0, min(10.0, round(base_score, 1)))
    
    def detect_anomaly(self, tourist_id: int, location_history: List[dict]) -> Dict:
        """Detect anomalous behavior patterns"""
        # Mock anomaly detection - replace with actual ML model
        if len(location_history) < 3:
            return {"anomaly_detected": False}
        
        # Simple anomaly detection based on location changes
        recent_locations = location_history[-3:]
        distances = []
        
        for i in range(1, len(recent_locations)):
            dist = self._calculate_distance(
                recent_locations[i-1], recent_locations[i]
            )
            distances.append(dist)
        
        avg_distance = sum(distances) / len(distances)
        
        # Flag as anomaly if sudden large movement
        if avg_distance > 5.0:  # 5km threshold
            return {
                "anomaly_detected": True,
                "anomaly_type": "unusual_movement",
                "confidence": 0.85,
                "description": "Unusual movement pattern detected"
            }
        
        return {"anomaly_detected": False}
    
    def get_chatbot_response(self, user_message: str, context: dict) -> str:
        """Generate chatbot response for tourist queries"""
        # Mock chatbot - replace with actual LLM integration
        message_lower = user_message.lower()
        
        responses = {
            "emergency": "In case of emergency:\n1. Use the panic button for immediate help\n2. Call local emergency number: 112\n3. Contact your embassy if needed\n4. Share your location with trusted contacts",
            "safety": "Safety tips:\n1. Stay in well-lit areas\n2. Keep documents secure\n3. Inform someone about your whereabouts\n4. Trust your instincts\n5. Use official transportation",
            "help": "I can help you with:\n- Emergency procedures\n- Safety tips\n- Local information\n- Navigation assistance\n- Contact emergency services",
            "location": "Your current location is being tracked for safety. If you feel unsafe, use the panic button or contact local authorities at 112.",
            "police": "To contact police:\n- Emergency: 112\n- Tourist Police: 1363\n- Use the panic button for immediate assistance"
        }
        
        for keyword, response in responses.items():
            if keyword in message_lower:
                return response
        
        return "I understand your concern. For immediate assistance, please use the panic button or contact emergency services at 112. How else can I help you stay safe?"
    
    def _get_time_factor(self) -> float:
        """Get safety factor based on time of day"""
        current_hour = datetime.now().hour
        
        if 6 <= current_hour <= 18:  # Daytime
            return 1.1
        elif 18 <= current_hour <= 22:  # Evening
            return 1.0
        else:  # Night
            return 0.8
    
    def _get_location_safety_factor(self, location_data: dict) -> float:
        """Get safety factor based on location"""
        # Mock location safety - replace with actual data
        return random.uniform(0.8, 1.2)
    
    def _calculate_distance(self, loc1: dict, loc2: dict) -> float:
        """Calculate distance between two locations (simplified)"""
        # Simplified distance calculation
        lat_diff = abs(loc1.get("latitude", 0) - loc2.get("latitude", 0))
        lng_diff = abs(loc1.get("longitude", 0) - loc2.get("longitude", 0))
        return (lat_diff + lng_diff) * 111  # Rough km conversion

# Global AI service instance
ai_service = AIService()