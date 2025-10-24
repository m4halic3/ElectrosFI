from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.api.endpoints import router


app = FastAPI()

app.include_router(router)
    
