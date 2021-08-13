# -*- coding: utf-8 -*-
import nfc
from time import sleep
import subprocess

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
    while True:

        try:
            clf = nfc.ContactlessFrontend('usb') #USB接続のNFCリーダーを開く
            try:
                clf.connect(rdwr={'on-connect': connected})#NFCリーダーを起動して,NFCリーダーのタッチ検出をします
                clf.close()
                writehtml()
                
                return res
            except nfc.tag.tt3.Type3TagCommandError:#タッチが弱くて読み取れないとき
                print("タッチが短すぎます")
                clf.close()

                

        except IOError:
            print("NFCリーダーの接続を確認して、再度実行してください、USBを再起動します(前回予期せぬ終了)")
            cmd='sudo hub-ctrl -h 0 -P 2 -p 0'#USB OFF
            off = subprocess.call(cmd.split())
            cmd='sudo hub-ctrl -h 0 -P 2 -p 1'#USB ON
            on = subprocess.call(cmd.split())
            print("再起動をお待ちください")
            sleep(1)#これ以上早すぎると安定しない
            print("再起動が完了しました")

def writehtml():
    file = 'ID.html'
    with open(file,'r',encoding='utf-8') as f:
        data = f.read()
    if len(res)==8 and not str(res)==data:
        with open(file,'w',encoding='utf-8') as f:
            f.write(res)
    



if __name__ == '__main__':
    while True:
        CardRead()