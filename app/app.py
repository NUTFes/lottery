#Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask,render_template
from . import HelloWorld

#Flaskオブジェクトの生成
app = Flask(__name__, static_folder="static", static_url_path='')


#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def route():
    return render_template("ID.html")



#「/index」へアクセスがあった場合に、「index.html」を返す
@app.route("/index")
def index():
    f = open('static/ID.txt', "r")
    print(f.read())
    f.close()
    return print(f.read())



#おまじない
if __name__ == "__main__":
    app.run(debug=True)