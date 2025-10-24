# -*- coding: utf-8 -*-
import numpy as np

from ngsolve import HCurl, Mesh, pi, cos, sin, curl, exp, x,y,z,dx, CoefficientFunction, BilinearForm, LinearForm
from ngsolve import Preconditioner, GridFunction, TaskManager, CGSolver, VTKOutput
from netgen.read_gmsh import ReadGmsh
from model.simulation_data import SimulationData, MaterialProperties, SourceParameters
from service.helper import Helper
from typing import List


class SimulationService():

    def __init__(self):
        self.helper = Helper()

    def simulate(self, data: SimulationData):
        print(f'Request data {data}')
        mesh = self._read_gmsh_mesh(f"simulation_data/{data.gmsh_mesh_path}")

        # Define the finite element space
        fes = HCurl(mesh, order=2, nograds=True)
        print("ndof =", fes.ndof)

        # Define test and trial functions
        u, v = fes.TnT()

        # Define material properties
        mu0 = self.helper.mu0
        print(f"Relative mu {self._get_material_properties(data.materials)}")
        mur = mesh.MaterialCF(self._get_material_properties(data.materials), default=1)

        # Define source parameters
        source_parameters = data.sources[0]
        wavelength = source_parameters.wavelength
        omega = 2 * pi / wavelength
        wave_width = source_parameters.wave_width

        # Define the source position and function
        source_position = source_parameters.source_position
        t = 0.1
        source = exp( -((x - source_position[0]) ** 2 + (y - source_position[1]) ** 2 + (z - source_position[2]) ** 2) / (
                    2 * (wave_width ** 2)) ) * cos(omega * t)
        source_vector = CoefficientFunction((source, 0, 0))

        # Define the bilinear form
        a = BilinearForm(fes, symmetric=True)
        a += (1 / (mu0 * mur)) * curl(u) * curl(v) * dx + 1e-6 * (1 / (mu0 * mur)) * u * v * dx

        # Define the preconditioner
        c = Preconditioner(a, type="bddc")

        # Define the linear form (source term)
        f = LinearForm(fes)

        # material_coef = mesh.MaterialCF({"magnet" : (1,0,0)}, default=(0,0,0))
        f += source_vector * v * dx

        # Define the grid function for the solution
        u_sol = GridFunction(fes)

        # Assemble and solve the system
        with TaskManager():
            a.Assemble()
            f.Assemble()
            solver = CGSolver(mat=a.mat, pre=c.mat)
            u_sol.vec.data = solver * f.vec

        self.helper.verify_simultion_dir(data.simulation_id, data.production)    

        # Legacy aplicado com essa referência: https://ngsolve.org/forum/ngspy-forum/1470-vtkoutput-problem-vtu-files-instead-of-vtk-files#4000
        vtk = VTKOutput(
            mesh, coefs=[u_sol], names=["sol"], 
            filename=f"simulation_data/{data.simulation_id}/{data.production}/simulation", 
            subdivision=2, legacy=True)
        vtk.Do()

        self.helper.create_data_csv(mesh, u_sol, data.simulation_id, data.production)
        self.helper.plot_2d_data_simulation(data.simulation_id, data.production)
        self.helper.plot_3d_data_simulation(data.simulation_id, data.production)


    def _read_gmsh_mesh(self, mesh_path):
        netgen_mesh = ReadGmsh(mesh_path)  # Read the .msh file
        mesh = Mesh(netgen_mesh)  # Convert the .msh file to a Netgen file
        return mesh

    def _get_material_properties(self, materials: List[MaterialProperties]):
        dict = {}
        for m in materials:
            # eps = self.helper.get_permittivity_by_refraction_index(refraction_index=m.refraction_index,
            #                                                  is_magnetic_material=False, eps_r=None)
            # mu = self.helper.get_permeability(is_magnetic_material=False, mu_r=None)
            if m.mu_r is not None:
                dict[m.name] = m.mu_r
            else:
                dict[m.name] = 1.0
        return dict
