# -*- coding: utf-8 -*-
import nfc
import requests
import json
import os
os.environ["NO_PROXY"] = "localhost"
from datetime import datetime as dt
import signal
signal.signal(signal.SIGINT, signal.SIG_DFL)

REQUEST_PLACE_ID = 1
REQUEST_URL = "http://localhost:8000"
POST_NUMBER_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/add'
POST_MESSAGE_URI = REQUEST_URL +'/api/place/'+ str(REQUEST_PLACE_ID) +'/message/add'


def scan_card(): 
  clf = nfc.ContactlessFrontend('usb') #USB接続のNFCリーダーを開く
  clf.connect(rdwr={'on-connect': connected})
  clf.close()
  if confirm_registerable():
    post_res_number(res["number"])
    send_message(str(res["expiration"])) 


def connected(tag):
  global res
  if isinstance(tag, nfc.tag.tt3.Type3Tag):
    try:
      idm, pmm = tag.polling(system_code=0xfe00)
      tag.idm, tag.pmm, tag.sys = idm, pmm, 0xfe00
      service_code = [nfc.tag.tt3.ServiceCode(0x1A8B >> 6, 0x1A8B & 0x3f)]
      bc_id = [nfc.tag.tt3.BlockCode(0)]
      data_id = tag.read_without_encryption(service_code, bc_id)
      bc_date = [nfc.tag.tt3.BlockCode(3)]
      data_date = tag.read_without_encryption(service_code, bc_date)
      res = {
        'number': data_id[2:10].decode("utf-8"), 
        'expiration': int(data_date[0:8].decode("utf-8")+'2359'), 
        'updated_at': int(dt.now().strftime('%Y%m%d%H%M'))
      }
    except Exception as e: #多分これのせいでIOErrorができない
      print("error: %s" % e)
  else:
    print("error: tag isn't Type3Tag")


def confirm_registerable():
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
    "place_id": REQUEST_PLACE_ID,
    "number": number
  }
  response = requests.post(POST_NUMBER_URI, headers=headers, data=json.dumps(data))
  print(response.text)


def send_message(message: str):
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
  res = {
    'number': 00000000, 
    'expiration': 196001010000, 
    'updated_at': int(dt.now().strftime('%Y%m%d%H%M'))
  }
  oldres = {
    'number': 00000000, 
    'expiration': 196001010000, 
    'updated_at': int(dt.now().strftime('%Y%m%d%H%M'))
  }
  while True:
    scan_card()