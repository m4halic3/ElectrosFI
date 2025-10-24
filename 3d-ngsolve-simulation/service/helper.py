# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv
import os


class Helper:

    def __init__(self):
        self.c0 = 3 * 10 ** 8 # speed of light in free space
        self.eps0 = 8.854 * 10 ** (-12) # permittivity of free space
        self.mu0 = 4 * np.pi * 10 ** (-7) # permeability of free space
        self.hbar = 6.626 * 10 ** (-34) / (2 * np.pi) # hbar in free space



    def get_permittivity_by_refraction_index(self, refraction_index, is_magnetic_material=False, eps_r=None):
        if is_magnetic_material:
            if eps_r is None:
                raise ValueError("Relative permittivity is required for magnetic materials")
            else:
                eps = self.eps0 * eps_r
        else:
            eps_r = refraction_index ** 2
            eps = self.eps0 * eps_r

        return eps

    def get_permeability(self, is_magnetic_material=False, mu_r=None):
        if is_magnetic_material:
            if mu_r is None:
                raise ValueError("Relative permittivity is required for magnetic materials")
            else:
                mu = self.mu0 * mu_r
        else:
            mu_r = 1
            mu = self.mu0 * mu_r
        return mu
    
    def verify_simultion_dir(self, simulation_id: str, production: str):
        
        if not os.path.exists(f"simulation_data/{simulation_id}/"):
            os.mkdir(f"simulation_data/{simulation_id}/")

        if not os.path.exists(f"simulation_data/{simulation_id}/{production}"):
            os.mkdir(f"simulation_data/{simulation_id}/{production}")

    def create_data_csv(self, mesh, u_sol, simulation_id: str, production: str):

        # Generate points to evaluate the solution at
        points = [(x, y, z) for x in np.linspace(0, 1, 10) for y in np.linspace(0, 1, 10) for z in
                  np.linspace(0, 1, 10)]

        # Open a CSV file to save the solution
        with open(f'simulation_data/{simulation_id}/{production}/simulation.csv', mode='w', newline='') as file:
            writer = csv.writer(file)
            # Write headers
            writer.writerow(['x', 'y', 'z', 'Ex', 'Ey', 'Ez'])

            # Loop over points and extract solution
            for point in points:
                x, y, z = point
                E_value = u_sol(mesh(x, y, z))  # Get the electric field vector at the point
                writer.writerow([x, y, z, E_value[0], E_value[1], E_value[2]])  # Write x, y, z, Ex, Ey, Ez

    def plot_2d_data_simulation(self, simulation_id: str,production: str):

        # Load CSV data
        data = pd.read_csv(f'simulation_data/{simulation_id}/{production}/simulation.csv')

        # Extract columns from the data
        x = data['x']
        y = data['y']
        Ex = data['Ex']
        Ey = data['Ey']

        # Plotting the vector field (Ex, Ey) as quivers
        plt.figure(figsize=(8, 6))
        plt.quiver(x, y, Ex, Ey, angles='xy', scale_units='xy', scale=1)

        # Add labels and title
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('2D Vector Field (Ex, Ey)')

        # Show the plot
        plt.grid()
        plt.savefig(f'simulation_data/{simulation_id}/{production}/2d_simulation.png', dpi=300)

    def plot_3d_data_simulation(self, simulation_id: str, production: str):

        # Load CSV data
        data = pd.read_csv(f'simulation_data/{simulation_id}/{production}/simulation.csv')

        # Extract columns from the data
        x = data['x']
        y = data['y']
        z = data['z']
        Ex = data['Ex']
        Ey = data['Ey']
        Ez = data['Ez']

        # Create a 3D plot
        fig = plt.figure(figsize=(10, 8))
        ax = fig.add_subplot(111, projection='3d')

        # Plot the vector field (Ex, Ey, Ez) using quivers
        ax.quiver(x, y, z, Ex, Ey, Ez, length=0.1, normalize=True, cmap='viridis', lw=0.7)

        # Add labels and title
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')
        ax.set_title('3D Vector Field (Ex, Ey, Ez)')

        # Save the plot
        plt.savefig(f'simulation_data/{simulation_id}/{production}/3d_simulation.png', dpi=300)