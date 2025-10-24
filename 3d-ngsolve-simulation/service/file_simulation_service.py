from typing import Tuple
import os

class FileSimulationService:

    def __init__(self, simulation_id, production) -> None:
        self.simulation_id = simulation_id
        self.production = production

    def get_file_path(self, file: str) -> Tuple[str]:
        file_path = f"simulation_data/{self.simulation_id}/{self.production}/"

        match file:
            case "2d": 
                file_name = "2d_simulation.png"
                media_type = "image/png"
            case "3d": 
                file_name = "3d_simulation.png"
                media_type = "image/png"
            case "csv": 
                file_name = "simulation.csv"
                media_type = "text/csv"
            case "vtk":
                file_name = "simulation.vtk"
                media_type = "application/octet-stream"
            case _:
                raise ValueError("file format unsuppored")
            
        file_path += file_name

        if not os.path.exists(file_path):
            raise OSError("file not exists")
            
        return (file_path, media_type, file_name)


    
