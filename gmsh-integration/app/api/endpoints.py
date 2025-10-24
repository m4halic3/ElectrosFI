from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.schemas import RequestSchema
from app.services.mesh_creator import MeshCreator
from app.util import GeometryListCreator

router = APIRouter()

@router.post("/")
async def main(request: RequestSchema): 
    try:
        geometry_list_creator = GeometryListCreator(request.geometries)
        geometry_list = geometry_list_creator.create()

        mesh_creator = MeshCreator(geometry_list, request.id)
        mesh_id = mesh_creator.create()

        content = {
            "message": "successfully created mesh",
            "mesh_id": mesh_id     
        }
        
        return JSONResponse(content=content, status_code=201)
    except Exception as e: 
        content = { "message": e.args }
        return JSONResponse(content=content, status_code=400)