# -*- coding: utf-8 -*-
import datetime

res = 20301789

def writejs():
    file = 'ID.js'
    log = 'ID.log'
    dt_now = datetime.datetime.now()
    log_data = str(dt_now)+' '+str(res)+'\n'
    with open(file,'r',encoding='utf-8') as f:
        print(f)
        print('ここまで')
        lines = f.read()
        print(lines)
        start = lines.find('<h2>')
        end = lines.find('</h2>')
        change = f[start:end]
        data = change.replace('<h2>','').replace('</h2>','')
    print(log_data)
    if len(res)==8 and not str(res)==data:
        with open(file,'w',encoding='utf-8') as f:
            lines = f.read()
            f.lines(change,'<h2>'+str(res)+'</h2>')
            f.write(res)
        with open(log,'a',encoding='utf-8') as f:
            f.write(log_data)

if __name__ == '__main__':
    writejs()