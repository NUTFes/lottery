from typing import List
from starlette.websockets import WebSocket


class Notifier:
    def __init__(self):
        self.connections: List[WebSocket] = []
        self.generator = self.get_notification_generator()

    async def get_notification_generator(self):
        while True:
            # 通常時yieldで値がsendされるまで待ち続ける
            message = yield
            await self._notify(message)

    async def push(self, msg: str):
        # ジェネレータにメッセージを送信
        await self.generator.asend(msg)

    async def connect(self, websocket: WebSocket):
        # セッションの許可
        await websocket.accept()
        # 許可されたセッションをリストに追加
        self.connections.append(websocket)

    def remove(self, websocket: WebSocket):
        self.connections.remove(websocket)

    # pushで受け取ったメッセージをここで全クライアントに配信
    async def _notify(self, message: str):
        living_connections = []
        while len(self.connections) > 0:
            # await websocket.send_text(message)処理時
            # セッションが切れたときの対策
            websocket = self.connections.pop()
            await websocket.send_text(message)
            living_connections.append(websocket)
        self.connections = living_connections
