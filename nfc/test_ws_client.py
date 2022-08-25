# -*- coding: utf-8 -*-
import asyncio
import json
import os
import random
import signal
from datetime import datetime as dt
from time import sleep

import requests
import websockets
from requests.auth import HTTPBasicAuth

signal.signal(signal.SIGINT, signal.SIG_DFL)

ST_USER = os.getenv("ST_USER")
ST_PASS = os.getenv("ST_PASS")
ST_APP_URL = os.getenv("ST_APP_URL")
ST_WS_URL = os.getenv("ST_WS_URL")
PLACE_ID = os.getenv("PLACE_ID")

POST_URI = f"{ST_APP_URL}/api/user?place_id={PLACE_ID}"
SEND_URI = f"{ST_WS_URL}/ws"


def scan_card():
    res = {
        "number": random.randrange(10**7, 10**8),
        "expiration": random.randrange(10**11, 10**12),
        "updated_at": int(dt.now().strftime("%Y%m%d%H%M")),
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
    if res["number"] == oldres["number"] and (res["updated_at"] - oldres["updated_at"]) < 5:
        return False
    oldres = res
    return True


def post_res_number(number):
    headers = {
        "Content-Type": "application/json",
    }
    data = {"number": number, "place_id": PLACE_ID}
    response = requests.post(
        POST_URI,
        headers=headers,
        data=json.dumps(data),
        auth=HTTPBasicAuth(ST_USER, ST_PASS),
    )
    print(response.text, flush=True)


async def send_message(message):
    # ウェブソケットに接続する。
    async with websockets.connect(SEND_URI) as websocket:
        # メッセージを送信する。
        data = {"place_id": PLACE_ID, "client": "NFC", "message": message}
        await websocket.send(json.dumps(data))
        # WebSocketサーバからメッセージを受信すればコンソールに出力する。
        data = await websocket.recv()
        # コンソール出力
        print(data, flush=True)


if __name__ == "__main__":
    oldres = {
        "number": 00000000,
        "expiration": 196001010000,
        "updated_at": int(dt.now().strftime("%Y%m%d%H%M")),
    }
    while True:
        scan_card()
