FROM python:3.10

# Instalação do cmake
RUN apt-get update && apt-get install -y cmake

WORKDIR /app

COPY . .

ARG PORT

ENV PORT=$PORT

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


EXPOSE $PORT

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "${PORT}"]