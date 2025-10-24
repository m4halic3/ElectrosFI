import gmsh
from app.schemas import BasicPolygonSchema
from app.services.geometries import Geometry


class TringleGeometry(Geometry):
    def __init__(self, geometry_schema: BasicPolygonSchema) -> None:
        super().__init__(geometry_schema)

    def create_mesh(self):
        p1 = gmsh.model.occ.add_point(self._x, self._y, self._z)
        p2 = gmsh.model.occ.add_point(self._x + self._width , self._y, self._z)
        p3 = gmsh.model.occ.add_point(self._x + self._width / 2, 
                                        self._y + self._height, self._z)

        l1 = gmsh.model.occ.add_line(p1, p2)
        l2 = gmsh.model.occ.add_line(p2, p3)
        l3 = gmsh.model.occ.add_line(p3, p1)

        loop = gmsh.model.occ.add_curve_loop([l1, l2, l3])

        base_surface = gmsh.model.occ.add_plane_surface([loop])

        gmsh.model.occ.synchronize()

        extruded = gmsh.model.occ.extrude([(2, base_surface)], 0, 0, self._depth)

        self._tag = extruded[1][1]

