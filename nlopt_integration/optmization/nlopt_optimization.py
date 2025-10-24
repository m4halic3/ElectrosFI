import nlopt
from optmization.nlopt_algorithms import algorithms
from functions import get_objective_function
from dtos import OptimizationDTO

class NLoptOptimization:
    
    __xtol = 1
    __lb = [0]
    __ub = [1]
    __min_max = "MIN"
    __ntests = 100

    def __init__(self, optimization_data: OptimizationDTO):
        self.__lb = optimization_data.lb
        self.__ub = optimization_data.ub
        self.__min_max = optimization_data.min_max
        self.__x = optimization_data.x
        # self.__grad = optimization_data.grad
        self.__xtol = optimization_data.xtol
        self.__ntests = optimization_data.num_tests
        self.__objective_function = get_objective_function(optimization_data.objective_function)
        self.__algorithm_type = algorithms(optimization_data.algorithm)

    @property
    def x(self) -> int:
        return self.__x

    def __get_dimension_problem(self) -> int:
        return len(self.__x)
    
    def __verify_bounds_size(self) -> None:
        x = self.__get_dimension_problem()

        if len(self.__lb) != x:
            raise ValueError(
                "The number of lower bounds parameters is different from x")
        if len(self.__ub) != x:
            raise ValueError(
                "The number of upper bounds parameters is different from x")
    

    # FLEXIVEL
    def execute_optimization(self):
        opt = nlopt.opt(self.__algorithm_type, self.__get_dimension_problem()) #NLopt class

        self.__verify_bounds_size()

        opt.set_lower_bounds(self.__lb) #Setando os pontos mínimos
        opt.set_upper_bounds(self.__ub) #Setando os pontos máximos
        
        if self.__min_max == "MIN":
            opt.set_min_objective(self.__objective_function) #Min objetive
        elif self.__min_max == "MAX":
            opt.set_max_objective(self.__objective_function) #Max objetive
            
        opt.set_xtol_rel(self.__xtol) #o intervalo 
        opt.set_maxeval(self.__ntests) #quantas vezes o codigo vai rodar

        ksx = opt.optimize(self.__x)
        return opt.last_optimum_value()

