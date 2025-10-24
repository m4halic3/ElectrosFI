import gmsh
import sys

gmsh.initialize()


gmsh.model.add("cylinder")

tm = 0.1
allp = 1

gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(allp, 0, 0, tm, 2)
gmsh.model.geo.addPoint(-allp, 0, 0, tm, 3)
gmsh.model.geo.addPoint(0, allp, 0, tm, 4)
gmsh.model.geo.addPoint(0, -allp, 0, tm, 5)

gmsh.model.geo.addCircleArc(2, 1, 4, 6)
gmsh.model.geo.addCircleArc(4, 1, 3, 7)
gmsh.model.geo.addCircleArc(3, 1, 5, 8)
gmsh.model.geo.addCircleArc(5, 1, 2, 9)

gmsh.model.geo.addCurveLoop([6, 7, 8, 9], 1)

gmsh.model.geo.addPlaneSurface([1], 1)

gmsh.model.geo.extrude([(2, 1)], 0, 0, 3, [6])

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("cylinder.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()
