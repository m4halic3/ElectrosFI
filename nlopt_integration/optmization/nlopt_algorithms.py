import nlopt


def algorithms(algorithms: str):
    match algorithms:
        case "LD_MMA": 
            return nlopt.LD_MMA
        case _:
            raise ValueError("invald nlopt algorithm")
