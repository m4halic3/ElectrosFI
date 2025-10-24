import gmsh
import sys

gmsh.initialize()

gmsh.model.add("cubo")

tm = 0.1
allp = 1

gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(allp/2, -allp, 0, tm, 2)
gmsh.model.geo.addPoint(allp, 0, 0, tm, 3)
gmsh.model.geo.addPoint(allp/2, allp, 0, tm, 4)

gmsh.model.geo.addLine(1, 2, 1)
gmsh.model.geo.addLine(2, 3, 2)
gmsh.model.geo.addLine(3, 4, 3)
gmsh.model.geo.addLine(4, 1, 4)

gmsh.model.geo.addCurveLoop([1, 2, 3, 4], 1)

gmsh.model.geo.addPlaneSurface([1], 1)

gmsh.model.geo.extrude([(2, 1)], 0, 0, 1, [6])

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("cubo.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()

