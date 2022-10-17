FROM golang:latest

WORKDIR /goapi

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y locales \
  && locale-gen ja_JP.UTF-8 \
  && echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc

RUN export LANG=C.UTF-8
RUN export LANGUAGE=en_US:

RUN go install github.com/swaggo/swag/cmd/swag@latest

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
