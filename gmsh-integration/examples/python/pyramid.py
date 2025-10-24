import gmsh
import sys

gmsh.initialize()

tm = 0.5

gmsh.model.add("pyramid")
gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(5, 0, 0, tm, 2)
gmsh.model.geo.addPoint(5, 5, 0, tm, 3)
gmsh.model.geo.addPoint(0, 5, 0, tm, 4)
gmsh.model.geo.addPoint(2.5, 2.5, 5, tm, 5)

gmsh.model.geo.addLine(1, 2, 6)
gmsh.model.geo.addLine(2, 3, 7)
gmsh.model.geo.addLine(3, 4, 8)
gmsh.model.geo.addLine(4, 1, 9)
gmsh.model.geo.addLine(1, 5, 10)
gmsh.model.geo.addLine(2, 5, 11)
gmsh.model.geo.addLine(3, 5, 12)
gmsh.model.geo.addLine(4, 5, 13)

gmsh.model.geo.addCurveLoop([6, 7, 8, 9], 14)
gmsh.model.geo.addCurveLoop([6, 11, -10], 15)
gmsh.model.geo.addCurveLoop([7, 12, -11], 16)
gmsh.model.geo.addCurveLoop([8, 13, -12], 17)
gmsh.model.geo.addCurveLoop([9, 10, -13], 18)

gmsh.model.geo.addPlaneSurface([14], 19)
gmsh.model.geo.addPlaneSurface([15], 20)
gmsh.model.geo.addPlaneSurface([16], 21)
gmsh.model.geo.addPlaneSurface([17], 22)
gmsh.model.geo.addPlaneSurface([18], 23)

gmsh.model.geo.addSurfaceLoop([19, 20, 21, 22, 23], 24)
gmsh.model.geo.addVolume([24], 25)

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("pyramid.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()

