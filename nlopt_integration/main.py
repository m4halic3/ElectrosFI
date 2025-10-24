from fastapi import FastAPI, HTTPException
from dtos import OptimizationDTO
from optmization import NLoptOptimization

app = FastAPI()

@app.post("/")
def main(optimization_data: OptimizationDTO):
    try:
        opt = NLoptOptimization(optimization_data)
        # opt.inequality(opt.get_x())
        return opt.execute_optimization()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=e.args)
    except Exception as e:
        raise HTTPException(status_code=500, detail=e.args)