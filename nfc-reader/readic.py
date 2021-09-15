# -*- coding: utf-8 -*-
import nfc
import requests
from time import sleep
import subprocess
import json
import os
import datetime

dt_now = datetime.datetime.now()
os.environ["NO_PROXY"] = "localhost"

REQUEST_PLACE_ID = 1
REQUEST_URL = "http://localhost:8000"
POST_NUMBER_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/add'
POST_MESSAGE_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/message/add'

global res
global tag
res = {
    'number': 00000000, 
    'expiration': 00000000, 
    'updated_at': dt_now}

def connected(): #tag       
    return False

def is_enable_register(res):
    try:
        if res.number == res.number and (res.updated_at - res.updated_at).seconds > 5*60:
            raise Exception
        if datetime.datetime.strptime(str(res.expiration),'%Y%m%d') > res.updated_at:
            raise Exception
        post_number(res.number)
        post_message(str(res.number))

    except:
        return False

def touch_card(clf):
    data = clf.connect(rdwr={'on-connect': connected})#NFCリーダーを起動して,NFCリーダーのタッチ検出をします
    idm, pmm = data.polling(system_code=0xfe00)
    data.idm, data.pmm, data.sys = idm, pmm, 0xfe00
    service_code = [nfc.tag.tt3.ServiceCode(0x1A8B >> 6, 0x1A8B & 0x3f)]
    bc_id = [nfc.tag.tt3.BlockCode(0)]
    id = data.read_without_encryption(service_code, bc_id) # 学籍番号
    newres = {
        'number': id[2:10].decode("utf-8"), 
        'expiration': id[2:10].decode("utf-8"), 
        'updated_at': dt_now
        }
    return newres


def scan_card():
    try:
        clf = nfc.ContactlessFrontend('usb') #USB接続のNFCリーダーを開く
        try:
            res = touch_card(clf)
            clf.close()
            is_enable_register(res)

        except nfc.tag.tt3.Type3TagCommandError:
            post_message("タッチが短すぎます")
            clf.close()
        except nfc.tag.TagCommandError as e:
            if e.errno > 0x00FF:
                print("the tag returned an error status")
            else:
                print("command failed with some other error")
            clf.close()

    except IOError:
        post_message("接続エラー：NFCリーダーの接続を確認してください")
        sleep(5)
        cmd='sudo hub-ctrl -h 0 -P 2 -p 0'#USB OFF
        subprocess.call(cmd.split())
        cmd='sudo hub-ctrl -h 0 -P 2 -p 1'#USB ON
        subprocess.call(cmd.split())
        post_message("再起動をお待ちください")
        sleep(5)#これ以上早すぎると安定しない
        post_message("Hello Stickee!")
        sleep(5)

def post_number(number):
    headers = {
    'Content-Type': 'application/json',
    }
    data = {
        "place_id": REQUEST_PLACE_ID,
        "number": number
    }
    response = requests.post(POST_NUMBER_URI, headers=headers, data=json.dumps(data))
    print(response.text)


def post_message(message: str):
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
        scan_card()