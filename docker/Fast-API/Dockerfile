FROM python:3.9
WORKDIR /var/www/html
RUN pip install fastapi uvicorn[standard]
RUN pip install sqlalchemy
RUN pip install jinja2 python-multipart

# 今後必要かもしれないもの
# RUN pip install ujson email_validator Starlette requests aiofiles itsdangerous pyyaml graphene ujson orjson