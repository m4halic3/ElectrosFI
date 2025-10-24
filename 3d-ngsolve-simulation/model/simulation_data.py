# -*- coding: utf-8 -*-
from pydantic import BaseModel
from typing import Optional, Tuple, List

class MaterialProperties(BaseModel):
    name: str
    refraction_index: Optional[float] = None
    mu_r: Optional[float] = None
    eps_r: Optional[float] = None

class SourceParameters(BaseModel):
    wavelength: float
    wave_width: float
    source_position: Tuple[float, float, float]

class SimulationData(BaseModel):
    simulation_id: str
    production: str
    gmsh_mesh_path: str
    materials: List[MaterialProperties]
    sources: List[SourceParameters]

