# stickee
student IC keeper

## git
### git clone
- `git clone git@github.com:NUTFes/stickee.git`  

### git add
- `git add <file_name or directory_name>`

### git commit
- `git commit -m "<commit message>"`

### commitメッセージの書式
- ファイルを追加したとき
`git commit -m "[add] 内容 (#<issue番号>)"`
- ファイルを変更したとき
`git commit -m "[mod] 内容 (#<issue番号>)"`
- ファイルを削除したとき
`git commit -m "[del] 内容 (#<issue番号>)"`
- 例
`git commit -m "[mod] コントローラーを変更した (#12)"`

### git push
- `git push origin <branch名>`

## Docker
### build
```
docker-compose build
stickee/Fast-API/create_table.pyがあれば削除
docker-compose run --rm api python create_table.py
docker-compose up
```
### build（プロキシ内）
```
docker-compose build --build-arg http_proxy=http://proxy.nagaokaut.ac.jp:8080 --build-arg https_proxy=http://proxy.nagaokaut.ac.jp:8080
stickee/Fast-API/create_table.pyがあれば削除
docker-compose run -e http_proxy=http://proxy.nagaokaut.ac.jp:8080 -e https_proxy=http://proxy.nagaokaut.ac.jp:8080 --rm api python create_table.py
docker-compose up
```


