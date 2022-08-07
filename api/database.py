from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///stickee.db?check_same_thread=False"
SQLITE3_NAME = "./stickee.db"

# サポートしているDBと対話するためのエンジン
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# DBに接続するためのセッション作成
SessionLocal = sessionmaker(bind=engine)

# declarativeメタクラス
Base = declarative_base()
