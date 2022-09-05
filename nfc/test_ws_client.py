# -*- coding: utf-8 -*-
import asyncio
import json
import os
import random
import re
import signal
from datetime import datetime as dt
from time import sleep

import requests
import websockets
from requests.auth import HTTPBasicAuth

signal.signal(signal.SIGINT, signal.SIG_DFL)

PLACE_ID = os.getenv("PLACE_ID")

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

SSR_API_URI = os.getenv("SSR_API_URI")
WS_API_URI = os.getenv("WS_API_URI")


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
    url = f"{SSR_API_URI}/user?place_id={PLACE_ID}"
    headers = {
        "Content-Type": "application/json",
    }
    data = {"number": number, "place_id": PLACE_ID}
    response = requests.post(
        url,
        headers=headers,
        data=json.dumps(data),
        auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET),
    )
    print(response.text, flush=True)


async def send_message(message):
    # ウェブソケットに接続する。
    if bool(re.match(r"([0-9]){8}", message)):
        number = message
        message = "エントリー完了"
        status = "success"
    else:
        number = 00000000
        message = "カードを正しく読み取れませんでした"
        status = "error"
    async with websockets.connect(WS_API_URI) as websocket:
        # メッセージを送信する。
        data = {
            "place_id": PLACE_ID,
            "client": "NFC",
            "number": number,
            "status": status,
            "message": message,
        }
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
