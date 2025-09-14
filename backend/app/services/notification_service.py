from typing import List, Optional
import asyncio
import json
from ..core.redis import get_redis
from ..core.config import settings

class NotificationService:
    def __init__(self):
        self.redis = None
    
    async def init_redis(self):
        if not self.redis:
            self.redis = await get_redis()
    
    async def send_websocket_notification(self, channel: str, message: dict):
        """Send notification via WebSocket through Redis pub/sub"""
        await self.init_redis()
        await self.redis.publish(channel, json.dumps(message))
    
    async def send_panic_alert(self, tourist_data: dict, alert_data: dict):
        """Send panic alert to all relevant channels"""
        notification = {
            "type": "panic_alert",
            "tourist": tourist_data,
            "alert": alert_data,
            "timestamp": alert_data.get("created_at")
        }
        
        # Send to police dashboard
        await self.send_websocket_notification("police_alerts", notification)
        
        # Send to tourism department
        await self.send_websocket_notification("tourism_alerts", notification)
        
        # Mock SMS/Email notifications
        await self._mock_sms_notification(tourist_data, alert_data)
    
    async def send_geofence_alert(self, tourist_data: dict, zone_data: dict):
        """Send geofence violation alert"""
        notification = {
            "type": "geofence_alert",
            "tourist": tourist_data,
            "zone": zone_data,
            "timestamp": zone_data.get("timestamp")
        }
        
        await self.send_websocket_notification("tourist_alerts", notification)
        await self.send_websocket_notification("police_alerts", notification)
    
    async def send_safety_score_alert(self, tourist_data: dict, score: float):
        """Send low safety score alert"""
        if score < 5.0:  # Threshold for alerts
            notification = {
                "type": "safety_score_alert",
                "tourist": tourist_data,
                "safety_score": score,
                "timestamp": tourist_data.get("updated_at")
            }
            
            await self.send_websocket_notification("police_alerts", notification)
    
    async def _mock_sms_notification(self, tourist_data: dict, alert_data: dict):
        """Mock SMS notification - replace with actual Twilio integration"""
        print(f"SMS Alert: Tourist {tourist_data.get('name')} has triggered panic button")
        print(f"Location: {alert_data.get('address', 'Unknown')}")
        
        # In production, integrate with Twilio:
        # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        # message = client.messages.create(...)
    
    async def _mock_email_notification(self, tourist_data: dict, alert_data: dict):
        """Mock email notification - replace with actual AWS SES integration"""
        print(f"Email Alert: Emergency notification for {tourist_data.get('name')}")
        
        # In production, integrate with AWS SES:
        # ses_client = boto3.client('ses', region_name=settings.AWS_REGION)
        # ses_client.send_email(...)

# Global notification service instance
notification_service = NotificationService()