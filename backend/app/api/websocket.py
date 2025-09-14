from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List, Dict
import json
import asyncio
from ..core.redis import get_redis
from ..services.notification_service import notification_service

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "tourist": [],
            "police": [],
            "tourism": []
        }
    
    async def connect(self, websocket: WebSocket, client_type: str):
        await websocket.accept()
        if client_type in self.active_connections:
            self.active_connections[client_type].append(websocket)
    
    def disconnect(self, websocket: WebSocket, client_type: str):
        if client_type in self.active_connections:
            if websocket in self.active_connections[client_type]:
                self.active_connections[client_type].remove(websocket)
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast_to_type(self, message: str, client_type: str):
        for connection in self.active_connections[client_type]:
            try:
                await connection.send_text(message)
            except:
                # Remove dead connections
                self.active_connections[client_type].remove(connection)

manager = ConnectionManager()

@router.websocket("/ws/{client_type}")
async def websocket_endpoint(websocket: WebSocket, client_type: str):
    await manager.connect(websocket, client_type)
    
    # Start Redis subscriber for this client type
    redis = await get_redis()
    pubsub = redis.pubsub()
    
    # Subscribe to relevant channels
    channels = []
    if client_type == "tourist":
        channels = ["tourist_alerts", "geofence_alerts"]
    elif client_type == "police":
        channels = ["police_alerts", "panic_alerts"]
    elif client_type == "tourism":
        channels = ["tourism_alerts", "analytics_updates"]
    
    for channel in channels:
        await pubsub.subscribe(channel)
    
    try:
        # Handle incoming WebSocket messages and Redis pub/sub
        async def handle_redis_messages():
            async for message in pubsub.listen():
                if message["type"] == "message":
                    await manager.send_personal_message(
                        message["data"], websocket
                    )
        
        async def handle_websocket_messages():
            while True:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                
                # Handle different message types
                if message_data.get("type") == "ping":
                    await websocket.send_text(json.dumps({"type": "pong"}))
                elif message_data.get("type") == "location_update":
                    # Handle location updates
                    await handle_location_update(message_data, client_type)
        
        # Run both handlers concurrently
        await asyncio.gather(
            handle_redis_messages(),
            handle_websocket_messages()
        )
        
    except WebSocketDisconnect:
        manager.disconnect(websocket, client_type)
        await pubsub.unsubscribe(*channels)
        await pubsub.close()

async def handle_location_update(message_data: dict, client_type: str):
    """Handle real-time location updates"""
    if client_type == "tourist":
        # Process tourist location update
        location = message_data.get("location", {})
        tourist_id = message_data.get("tourist_id")
        
        # Check for geofence violations
        # Mock geofence check
        if location.get("latitude", 0) < 28.5:  # Mock unsafe zone
            await notification_service.send_geofence_alert(
                {"id": tourist_id, "name": "Tourist"},
                {"zone_type": "risk", "timestamp": message_data.get("timestamp")}
            )