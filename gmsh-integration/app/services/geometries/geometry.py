import gmsh
from abc import ABC, abstractmethod
from typing import Union, List, Tuple
from app.schemas import BasicPolygonSchema, SphereSchema

class Geometry(ABC):
    _tag: int
    _faces: List[Tuple[int]]
    _bc_tag: int

    def __init__(self, geometry_schema: Union[BasicPolygonSchema, SphereSchema]) -> None:
        self._material = geometry_schema.material

        if isinstance(geometry_schema, BasicPolygonSchema): 
            self._width = geometry_schema.width
            self._height = geometry_schema.height
            self._depth = geometry_schema.depth
            self._x = geometry_schema.x - geometry_schema.width  / 2 
            self._y = geometry_schema.y - geometry_schema.height / 2
            self._z = geometry_schema.z - geometry_schema.depth  / 2
        elif isinstance(geometry_schema, SphereSchema):
            self._radius = geometry_schema.radius
            self._x = geometry_schema.x
            self._y = geometry_schema.y
            self._z = geometry_schema.z

    @abstractmethod  
    def create_mesh():
        pass

    @property
    def tag(self):
        return self._tag 
    
    @property
    def bc_tag(self):
        return self._bc_tag
    
    @property
    def faces(self):
        return self._faces
    
    @property
    def material(self):
        return self._material

    def cut_mesh(self, background_geometry_tag: int):
        gmsh.model.occ.cut([(3, background_geometry_tag)], 
                           [(3, self._tag)], removeTool=False)


