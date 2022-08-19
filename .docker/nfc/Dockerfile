FROM python:3.10-buster
WORKDIR /nfc
# ENV POETRY_HOME=/opt/poetry
RUN pip install poetry && \
    poetry config --local virtualenvs.create true && \
    poetry config --local cache-dir .cache/pypoetry && \
    poetry config --local virtualenvs.in-project true
ENV PATH=/nfc/.venv/bin:$PATH