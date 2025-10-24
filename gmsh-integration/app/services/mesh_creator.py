import gmsh
import os
from typing import List
from app.services.geometries import Geometry, BackgroundGeometry
from app.services import MaterialPhysicalGroups

class MeshCreator:
    _mesh_storage_dir = "storage"
    def __init__(self, geometry_list: List[Geometry], id: str, view=False, logs=True) -> None:
        self._id = id
        self._mesh_file = f"{self._mesh_storage_dir}/{id}.msh"
        self._geometry_list = geometry_list
        self._material_physical_groups_service = MaterialPhysicalGroups(geometry_list)
        self._view = view
        self._logs = logs

    def create(self) -> str:
        gmsh.initialize()

        if not self._logs:
            gmsh.option.set_number("General.Terminal", 0)

        self._create_background_geometry()        
        self._create_geometry_meshs()

        gmsh.model.occ.synchronize()

        self._material_physical_groups_service.add()
        self._cut_geometry_meshs()

        gmsh.model.mesh.generate(3)

        gmsh.option.set_number("Mesh.MshFileVersion", 2.2)


        if not os.path.isdir(self._mesh_storage_dir): 
            os.mkdir(self._mesh_storage_dir)

        gmsh.write(self._mesh_file)

        if self._view: gmsh.fltk.run()
        
        gmsh.finalize()

        return self._id
    def _create_background_geometry(self):
        background_geometry = BackgroundGeometry()
        background_geometry.create_mesh()
        self._background_geometry = background_geometry
    
    def _create_geometry_meshs(self):
        for geometry in self._geometry_list:
            geometry.create_mesh()

    def _cut_geometry_meshs(self):
        for geometry in self._geometry_list:
            geometry.cut_mesh(self._background_geometry.tag)
