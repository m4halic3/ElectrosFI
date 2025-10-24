FROM ubuntu:22.04

COPY . /app

WORKDIR /app

ARG PORT
ENV PORT=$PORT

RUN apt-get update && apt-get upgrade -y
RUN apt-get install gmsh -y
RUN apt-get install pip -y
RUN pip install -r requirements.txt

EXPOSE $PORT

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "${PORT}"]