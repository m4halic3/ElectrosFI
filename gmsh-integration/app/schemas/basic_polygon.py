from pydantic import BaseModel

class BasicPolygonSchema(BaseModel):
    shape: str
    material: str
    width: float
    height: float
    depth: float
    x: float
    y: float
    z: float