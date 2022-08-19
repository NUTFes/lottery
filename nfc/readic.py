# -*- coding: utf-8 -*-
import asyncio
import json
import os
import signal
from datetime import datetime as dt

import requests
import websockets

# .env ファイルをロードして環境変数へ反映
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth

import nfc

load_dotenv()
signal.signal(signal.SIGINT, signal.SIG_DFL)


os.environ["NO_PROXY"] = "localhost"
ST_USER = os.getenv("ST_USER")
ST_PASS = os.getenv("ST_PASS")
ST_APP_URL = os.getenv("ST_APP_URL")
ST_WS_URL = os.getenv("ST_WS_URL")

PLACE_ID = 1
POST_URI = f"{ST_APP_URL}/api/place/{PLACE_ID}/add"
SEND_URI = f"{ST_WS_URL}/ws"


def scan_card():
    clf = nfc.ContactlessFrontend("usb")  # USB接続のNFCリーダーを開く
    clf.connect(rdwr={"on-connect": connected})
    clf.close()
    if confirm_registerable():
        send_message(str(res["number"]))
        post_res_number(res["number"])


def connected(tag):
    global res
    if isinstance(tag, nfc.tag.tt3.Type3Tag):
        try:
            idm, pmm = tag.polling(system_code=0xFE00)
            tag.idm, tag.pmm, tag.sys = idm, pmm, 0xFE00
            service_code = [nfc.tag.tt3.ServiceCode(0x1A8B >> 6, 0x1A8B & 0x3F)]
            bc_id = [nfc.tag.tt3.BlockCode(0)]
            data_id = tag.read_without_encryption(service_code, bc_id)
            bc_date = [nfc.tag.tt3.BlockCode(3)]
            data_date = tag.read_without_encryption(service_code, bc_date)
            res = {
                "number": data_id[2:10].decode("utf-8"),
                "expiration": int(data_date[0:8].decode("utf-8") + "2359"),
                "updated_at": int(dt.now().strftime("%Y%m%d%H%M")),
            }
        except Exception as e:  # 多分これのせいでIOErrorができない
            send_message("error: %s" % e)
    else:
        send_message("error: tag isn't Type3Tag")


def confirm_registerable():
    global oldres
    if res["expiration"] < res["updated_at"]:
        return False
    if res["number"] == oldres["number"] and (res["updated_at"] - oldres["updated_at"]) < 5:
        return False
    oldres = res
    return True


def confirm_sendable(message):
    global oldmessage
    if message == oldmessage:
        return False
    oldmessage = message
    return True


def post_res_number(number):
    headers = {
        "Content-Type": "application/json",
    }
    data = {"place_id": PLACE_ID, "number": number}
    response = requests.post(
        POST_URI, headers=headers, data=json.dumps(data), auth=HTTPBasicAuth(ST_USER, ST_PASS)
    )
    print(response.text)


def send_message(message):
    if confirm_sendable(message):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(send_message_noasync(message))


async def send_message_noasync(message):
    # ウェブソケットに接続する。
    async with websockets.connect(SEND_URI) as websocket:
        # メッセージを送信する。
        data = {"place_id": PLACE_ID, "client": "NFC", "message": message}
        await websocket.send(json.dumps(data))
        # WebSocketサーバからメッセージを受信すればコンソールに出力する。
        data = await websocket.recv()
        # コンソール出力
        print(data)


if __name__ == "__main__":
    oldmessage = ""
    oldres = {
        "number": 00000000,
        "expiration": 196001010000,
        "updated_at": int(dt.now().strftime("%Y%m%d%H%M")),
    }
    res = {
        "number": 00000000,
        "expiration": 196001010000,
        "updated_at": int(dt.now().strftime("%Y%m%d%H%M")),
    }
    while True:
        scan_card()
