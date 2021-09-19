import asyncio
# WebSocketモジュールを宣言する。
import websockets
 
async def connect():
  # ウェブソケットに接続する。
  async with websockets.connect("ws://localhost:9000") as websocket:
    # 10回を繰り返してウェブソケットサーバにメッセージを送信する。
    for i in range(1,10,1):
      # メッセージを送信する。
      await websocket.send("hello socket!!")
      # WebSocketサーバからメッセージを受信すればコンソールに出力する。
      data = await websocket.recv()
      # コンソール出力
      print(data)
# 非同期でサーバに接続する。
asyncio.get_event_loop().run_until_complete(connect())