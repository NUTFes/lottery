#Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask,render_template

#Flaskオブジェクトの生成
app = Flask(__name__, static_folder="static", static_url_path='')


#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def route():
    return "ID.html"



#「/index」へアクセスがあった場合に、「index.html」を返す
@app.route("/id")
def index():
    return render_template("ID.html")



#おまじない
if __name__ == "__main__":
    app.run(debug=True)