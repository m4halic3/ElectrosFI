# gmsh

### bibliotecas utilizadas:

- gmsh
- FastAPI

### como rodar?

#### para criar a imagem docker: 

```shell
docker build -t gmsh .
```

#### para rodar localmente:

baixe as dependencias:

```shell
pip install -r requirements.txt
```

rode o comando:

```shell
uvicorn app.main:app --reload
```