from typing import List
from app.schemas import BasicPolygonSchema, SphereSchema
from app.services.geometries import BoxGeometry, SphereGeometry, TringleGeometry, Geometry

class GeometryListCreator:
    def __init__(self, geometry_list_request: List[BasicPolygonSchema | SphereSchema]) -> None:
        self._geometry_list_request = geometry_list_request

    def create(self) -> List[Geometry]:    
        geometry_list = []

        for geometry in self._geometry_list_request:
            geo = self._select_geometry(geometry.shape)
            geometry_list.append(geo(geometry))
        
        return geometry_list

    def _select_geometry(self, geometry_shape: str) -> Geometry:
        match(geometry_shape):
            case "block"   : return BoxGeometry
            case "sphere"  : return SphereGeometry
            case "triangle": return TringleGeometry
            case _         : raise ValueError("Invalid geometry")
            