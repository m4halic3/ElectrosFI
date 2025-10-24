import gmsh
import sys
import math

gmsh.initialize()

gmsh.model.add("cone")

tm = 0.05

gmsh.model.geo.addPoint(0,0,0,tm,1)
gmsh.model.geo.addPoint(1,0,0,tm,2)
gmsh.model.geo.addPoint(0,0,3,tm,6)
gmsh.model.geo.addLine(1,2,1)
gmsh.model.geo.addLine(2,6,2)
gmsh.model.geo.addLine(6,1,3)
gmsh.model.geo.addCurveLoop([2,3,1],4)
gmsh.model.geo.addPlaneSurface([4], 5)
gmsh.model.geo.revolve([(2, 5)], 0,0,0,0,0,1, math.pi/2)
gmsh.model.geo.revolve([(2, 17)], 0,0,0,0,0,1, math.pi/2)
gmsh.model.geo.revolve([(2, 29)], 0,0,0,0,0,1, math.pi/2)
gmsh.model.geo.revolve([(2, 41)], 0,0,0,0,0,1, math.pi/2)

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("cone.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()
