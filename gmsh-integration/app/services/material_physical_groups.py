import gmsh
from typing import List, Dict
from app.services.geometries import Geometry

class MaterialPhysicalGroups:

    def __init__(self, geometries: List[Geometry]):
        self._geometries = geometries
        self._materials: Dict[str, List[int]] = {}

    def add(self):
        for material, tags in self._materials:
            gmsh.model.add_physical_group(3, tags, name=material)
    
    def _get_materials(self):
        for geometry in self._geometries:            
            self._materials[geometry.material].append(geometry.tag)
