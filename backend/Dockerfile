FROM python:3.11-slim

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install --upgrade pip

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --default-timeout=100 -r requirements.txt 

COPY . .

CMD ["python", "app.py", "--host", "0.0.0.0", "--port", "5000"]


