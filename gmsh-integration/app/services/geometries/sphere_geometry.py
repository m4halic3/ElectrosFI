import gmsh
from app.schemas import SphereSchema
from app.services.geometries import Geometry

class SphereGeometry(Geometry):
    def __init__(self, geometry_schema: SphereSchema) -> None:
        super().__init__(geometry_schema)

    def create_mesh(self):
        tag = gmsh.model.occ.add_sphere(
            self._x, self._y, self._z, self._radius
        )
        self._tag = tag
        