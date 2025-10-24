import pyvista as pv
import panel as pn
from panel.io.server import serve

# Create a PyVista plotter
plotter = pv.Plotter()

# Load the VTK file
mesh = pv.read('123abc.vtk')
plotter.add_mesh(mesh)

# Create a Panel object for the plotter
plot_panel = pn.pane.VTK(plotter.ren_win, sizing_mode='stretch_both', )

# Create a Panel layout
layout = pn.Column(
    pn.pane.Markdown("## VTK File Visualization"),
    plot_panel,
    sizing_mode='stretch_both',
)

# Serve the application
serve(layout, title="VTK File Visualization", port=5006, show=True)


