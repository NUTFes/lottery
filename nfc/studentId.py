#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import nfc
class NFC():
  def connected(tag):
    service_code = 0x1A8B
    #システムコード指定（指定しなければ最初に見つかった12FCが読まれる）
    idm, pmm = tag.polling(system_code=0xfe00)
    tag.idm, tag.pmm, tag.sys = idm, pmm, 0xfe00
    if isinstance(tag, nfc.tag.tt3.Type3Tag):
      try:
          #サービスコードの指定
          sc = nfc.tag.tt3.ServiceCode(service_code >> 6 ,service_code & 0x3f)
          #読取りブロックを指定（複数読むときは配列で指定する）
          bc_id = nfc.tag.tt3.BlockCode(0,service=0)
          data = tag.read_without_encryption([sc],[bc_id])
          #読む位置を指定：2から9byteまでを読んで
          print(data[2:10].decode("utf-8"))
      except Exception as e:
        print(("error: %s" % e))
    else:
      print("error: tag isn't Type3Tag")
  # タッチ時のハンドラを設定して待機する
  clf = nfc.ContactlessFrontend('usb')
  clf.connect(rdwr={'on-connect': connected})