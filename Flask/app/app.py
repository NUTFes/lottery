from flask import Flask,render_template,request,session,redirect,url_for
from models.models import OnegaiContent,User
from models.database import db_session
from datetime import datetime
from app import key
from hashlib import sha256

app=Flask(__name__)
app.secret_key = key.SECRET_KEY

@app.route("/")
@app.route("/index")
def index():
    if "user_name" in session:
        name = session["user_name"]
        all_onegai = OnegaiContent.query.all()
        return render_template("index.html",name=name,all_onegai=all_onegai)
    else:
        return redirect(url_for("top",status="logout"))

@app.route("/add",methods=["post"])
def add():
    title = request.form["title"]
    body = request.form["body"]
    content = OnegaiContent(title,body,datetime.now())
    db_session.add(content)
    db_session.commit()
    return redirect(url_for("index"))

@app.route("/update",methods=["post"])
def update():
    content = OnegaiContent.query.filter_by(id=request.form["update"]).first()
    content.title = request.form["title"]
    content.body = request.form["body"]
    db_session.commit()
    return redirect(url_for("index"))

@app.route("/delete",methods=["post"])
def delete():
    id_list = request.form.getlist("delete")
    for id in id_list:
        content = OnegaiContent.query.filter_by(id=id).first()
        db_session.delete(content)
    db_session.commit()
    return redirect(url_for("index"))

@app.route("/top")
def top():
    status = request.args.get("status")
    return render_template("top.html",status=status)

@app.route("/login",methods=["post"])
def login():
    user_name = request.form["user_name"]
    user = User.query.filter_by(user_name=user_name).first()
    if user:
        password=request.form["password"]
        hashed_password=sha256((user_name+password+key.SALT).encode("utf-8")).hexdigest()
        if user.hashed_password == hashed_password:
            session["user_name"] = user_name
            return redirect(url_for("index"))
        else:
            return redirect(url_for("top",status="wrong_password"))
    else:
        return redirect(url_for("top",status="user_notfound"))

@app.route("/newcomer")
def newcomer():
    status = request.args.get("status")
    return render_template("newcomer.html",status=status)

@app.route("/register",methods=["post"])
def register():
    user_name=request.form["user_name"]
    user = User.query.filter_by(user_name=user_name).first()
    if user:
        return redirect(url_for("newcomer",status="exist_user"))
    else:
        password = request.form["password"]
        hashed_password = sha256((user_name+password+key.SALT).encode("utf-8")).hexdigest()
        user = User(user_name,hashed_password)
        db_session.add(user)
        db_session.commit()
        session["user_name"] = user_name
        return redirect(url_for("index"))

@app.route("/logout")
def logout():
    session.pop("user_name",None)
    return redirect(url_for("top",status="logout"))


if __name__ == "__main__":
    app.run(debug=True)