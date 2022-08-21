FROM python:3.10-buster

RUN apt update \
    && apt install -y --no-install-recommends \
    dpkg-dev usbutils libnfc-dev udev \
    && apt autoremove -y && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN  sh -c 'echo ACTION==\"add\", ATTRS{idVendor}==\"${VENDOR}\", ATTRS{idProduct}==\"${PRODUCT}\", GROUP=\"plugdev\" >> /etc/udev/rules.d/nfcdev.rules'

RUN pip install poetry && \
    poetry config --local virtualenvs.create true && \
    poetry config --local cache-dir .cache/pypoetry && \
    poetry config --local virtualenvs.in-project true

WORKDIR /nfc
ENV PATH=/nfc/.venv/bin:$PATH