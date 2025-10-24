FROM python:3.10 as base

COPY . /app

WORKDIR /app

RUN pip install -r ./requirements.txt

RUN mkdir /simulation_data

EXPOSE 7000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "7000"]