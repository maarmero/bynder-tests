FROM python:3

WORKDIR /usr/src/app

COPY features behave.ini requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "behave" ]
ENV API_TOKEN=to-be-overridden