# -*- coding: utf-8 -*-
from fastapi import FastAPI
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from controllers.simulate_controller import app as simulate_routes

description = """
NGSolve 3D Simulation API
"""

app = FastAPI(
    title = "NGSolve 3D Simulation API",
    description = description
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(simulate_routes)


@app.get('/')
def root():
    return {'message': 'Welcome to NGSolve 3D Simulation API!'}