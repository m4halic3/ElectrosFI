import gmsh
from app.schemas import BasicPolygonSchema
from app.services.geometries import Geometry

class BoxGeometry(Geometry):
    def __init__(self, geometry_schema: BasicPolygonSchema) -> None:
        super().__init__(geometry_schema)

    def create_mesh(self):
        tag = gmsh.model.occ.add_box(
            self._x, self._y, self._z, 
            self._width, self._height, self._depth
        )
        self._tag = tag
