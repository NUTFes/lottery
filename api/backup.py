import atexit
import time

import gspread
from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from oauth2client.service_account import ServiceAccountCredentials

import crud

# 接続するために必要な情報
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("lottery-360514-50882d62107c.json", scope)
client = gspread.authorize(creds)
sheet = client.open("lottery-backup").sheet1


def get_last_row(sheet):
    A_ARRAY = sheet.col_values(1)
    last_row = len(A_ARRAY)
    return last_row


def backup(student_id, u_time):
    write_row = get_last_row(sheet) + 1
    sheet.update_cell(write_row, 1, str(student_id))
    sheet.update_cell(write_row, 2, str(u_time))
