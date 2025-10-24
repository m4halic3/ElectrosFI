# -*- coding: utf-8 -*-
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from model.simulation_data import SimulationData
from service.simulate_service import SimulationService
from service.file_simulation_service import FileSimulationService

app = APIRouter()

@app.get("/simulate/{simulation_id}/{production}/{file}")
def get_simulation(simulation_id: str, production: str, file: str):
    service = FileSimulationService(simulation_id, production)
    try:
        file_path, media_type, file_name = service.get_file_path(file)
    except OSError as e:
        data = {'code': 404, 'message': str(e)}
        code = 404
        return JSONResponse(content=data, status_code=code)
    except ValueError as e:
        data = {'code': 422, 'message': str(e)}
        code = 422
        return JSONResponse(content=data, status_code=code)
    except Exception as e:
        data = {'code': 400, 'message': str(e)}
        code = 400
        return JSONResponse(content=data, status_code=code)
    
    return FileResponse(path=file_path, media_type=media_type, filename=file_name)

@app.post('/simulate')
def simulate(simulation_data: SimulationData) -> JSONResponse:
    service = SimulationService()
    try:
        service.simulate(simulation_data)
        data = {'code':201,'message': 'Simulation successful!'}
        code = 201
    except Exception as e:
        print(e)
        data = {'code': 400, 'message': str(e)}
        code = 400
    return JSONResponse(content=data, status_code=code)


