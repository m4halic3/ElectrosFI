from pydantic import BaseModel
from typing import List, Union
from app.schemas import BasicPolygonSchema, SphereSchema

class RequestSchema(BaseModel):
    id: str
    geometries: List[Union[BasicPolygonSchema, SphereSchema]]