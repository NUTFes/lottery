# -*- coding: utf-8 -*-
import requests
import json
import os
os.environ["NO_PROXY"] = "localhost"
from datetime import datetime as dt
import signal
signal.signal(signal.SIGINT, signal.SIG_DFL)
import asyncio
import websockets
import random
from time import sleep

PLACE_ID  = 1
APP_URL   = "http://localhost:8000"
WS_URL    =  "ws://localhost:8000"
POST_URI  =  f'{APP_URL}/api/place/{PLACE_ID}/add'
SEND_URI  =  f'{WS_URL}/ws'


def scan_card(): 
  res = {
    'number': random.randrange(10**7,10**8), 
    'expiration': random.randrange(10**11,10**12), 
    'updated_at': int(dt.now().strftime('%Y%m%d%H%M'))
  }
  sleep(1)
  if confirm_registerable(res):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(send_message(str(res["number"])))
    post_res_number(res["number"])

def confirm_registerable(res):
  global oldres
  if res["expiration"] < res["updated_at"]:
    return False
  if res["number"] == oldres["number"] and \
    (res["updated_at"] - oldres["updated_at"]) < 5:
    return False
  oldres = res
  return True


def post_res_number(number):
    headers = {
      'Content-Type': 'application/json',
    }
    data = {
      "place_id": PLACE_ID,
      "number": number
    }
    response = requests.post(POST_URI, headers=headers, data=json.dumps(data))
    print(response.text)


async def send_message(message):
  # ウェブソケットに接続する。
  async with websockets.connect(SEND_URI) as websocket:
    # メッセージを送信する。
    data = {
      "place_id": PLACE_ID,
      "client"  : "NFC", 
      "message" : message
    }
    await websocket.send(json.dumps(data))
    # WebSocketサーバからメッセージを受信すればコンソールに出力する。
    data = await websocket.recv()
    # コンソール出力
    print(data)

if __name__ == '__main__':
  oldres = {
    'number'    : 00000000, 
    'expiration': 196001010000, 
    'updated_at': int(dt.now().strftime('%Y%m%d%H%M'))
  }
  while True:
    scan_card()