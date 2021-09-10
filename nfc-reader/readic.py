# -*- coding: utf-8 -*-
import nfc
import requests
from time import sleep
import subprocess
import json
import os
os.environ["NO_PROXY"] = "localhost"
REQUEST_PLACE_ID = 1
REQUEST_URL = "http://localhost:8000"
POST_NUMBER_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/add'
POST_MESSAGE_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/message/add'

def connected(tag):
    global id
    global res

    idm, pmm = tag.polling(system_code=0xfe00)
    tag.idm, tag.pmm, tag.sys = idm, pmm, 0xfe00

    service_code = [nfc.tag.tt3.ServiceCode(0x1A8B >> 6, 0x1A8B & 0x3f)]
    bc_id = [nfc.tag.tt3.BlockCode(0)]
    id = tag.read_without_encryption(service_code, bc_id) # 学籍番号
    res = id[2:10].decode("utf-8")
    return False
    

def CardRead():
    try:
        clf = nfc.ContactlessFrontend('usb') #USB接続のNFCリーダーを開く
        try:
            clf.connect(rdwr={'on-connect': connected})#NFCリーダーを起動して,NFCリーダーのタッチ検出をします
            clf.close()
            postNumber(res)
            postMessage(str(res))
            return res
        except nfc.tag.tt3.Type3TagCommandError:#タッチが弱くて読み取れないとき
            postMessage("タッチが短すぎます")
            clf.close()

    except IOError:
        postMessage("接続エラー：NFCリーダーの接続を確認してください")
        sleep(5)
        cmd='sudo hub-ctrl -h 0 -P 2 -p 0'#USB OFF
        subprocess.call(cmd.split())
        cmd='sudo hub-ctrl -h 0 -P 2 -p 1'#USB ON
        subprocess.call(cmd.split())
        postMessage("再起動をお待ちください")
        sleep(5)#これ以上早すぎると安定しない
        postMessage("再起動が完了しました")
        sleep(5)

def postNumber(number):
    headers = {
    'Content-Type': 'application/json',
    }
    data = {
        "place_id": REQUEST_PLACE_ID,
        "number": number
    }
    response = requests.post(POST_NUMBER_URI, headers=headers, data=json.dumps(data))
    print(response.text)


def postMessage(message: str):
    headers = {
    'Content-Type': 'application/json',
    }
    data = {
        "id": REQUEST_PLACE_ID,
        "message": message
    }
    response = requests.post(POST_MESSAGE_URI, headers=headers, data=json.dumps(data))
    print(response.text)

if __name__ == '__main__':
    while True:
        CardRead()