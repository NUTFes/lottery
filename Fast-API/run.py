from urls import app
import uvicorn

if __name__ == '__main__':
    # コンソールで [$ uvicorn run:app --reload]でも可
    uvicorn.run(app=app)