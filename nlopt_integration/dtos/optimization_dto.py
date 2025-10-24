from pydantic import BaseModel
from typing import List
class OptimizationDTO(BaseModel):
    x: List[float]
    lb: List[float]  #Ponto minimo
    ub: List[float]  #Ponto maximo 
    objective_function: int    #Qual função será usada
    xtol:float #Precisão
    quant_interact: int #Quantidade de interação
    min_max: str
    num_tests: int
    algorithm: str
    