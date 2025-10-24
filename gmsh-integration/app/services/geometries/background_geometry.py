from app.schemas import BasicPolygonSchema
from app.services.geometries import BoxGeometry
import gmsh

class BackgroundGeometry(BoxGeometry):
    def __init__(self, size=15) -> None:
        self._size = size
        background_geometry_schema = BasicPolygonSchema(shape="block", 
                                                  material="air", 
                                                  width=size, 
                                                  height=size,
                                                  depth=size,
                                                  x=0, y=0, z=0)
        super().__init__(background_geometry_schema)

    def add_physical_group(self):
        faces = gmsh.model.getBoundary([(3, self._tag)], oriented=False)
        self._faces = []
        for face in faces:
            center_face = gmsh.model.occ.getCenterOfMass(2, face[1])
            if (center_face[0] == 0 or center_face[0] == self._size or
                center_face[1] == 0 or center_face[1] == self._size or
                center_face[2] == 0 or center_face[2] == self._size):
                self._faces.append(face[1])
        self._bc_tag = gmsh.model.addPhysicalGroup(2, self._faces)