from pydantic import BaseModel

class SphereSchema(BaseModel):
    shape: str
    material: str
    radius: float
    x: float
    y: float
    z: float
