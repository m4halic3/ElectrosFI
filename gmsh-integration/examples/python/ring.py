import gmsh
import sys

gmsh.initialize()


gmsh.model.add("ring")

tm = 0.1
allp = 1
allp2 = 2

gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(allp, 0, 0, tm, 2)
gmsh.model.geo.addPoint(-allp, 0, 0, tm, 3)
gmsh.model.geo.addPoint(0, allp, 0, tm, 4)
gmsh.model.geo.addPoint(0, -allp, 0, tm, 5)
gmsh.model.geo.addPoint(0, 0, 0, tm, 6)
gmsh.model.geo.addPoint(allp2, 0, 0, tm, 7)
gmsh.model.geo.addPoint(-allp2, 0, 0, tm, 8)
gmsh.model.geo.addPoint(0, allp2, 0, tm, 9)
gmsh.model.geo.addPoint(0, -allp2, 0, tm, 10)

gmsh.model.geo.addCircleArc(2, 1, 4, 1)
gmsh.model.geo.addCircleArc(4, 1, 3, 2)
gmsh.model.geo.addCircleArc(3, 1, 5, 3)
gmsh.model.geo.addCircleArc(5, 1, 2, 4)
gmsh.model.geo.addCircleArc(7, 6, 9, 5)
gmsh.model.geo.addCircleArc(9, 6, 8, 6)
gmsh.model.geo.addCircleArc(8, 6, 10, 7)
gmsh.model.geo.addCircleArc(10, 6, 7, 8)

gmsh.model.geo.addCurveLoop([1, 2, 3, 4], 1)

gmsh.model.geo.addCurveLoop([5, 6, 7, 8], 2)

gmsh.model.geo.addPlaneSurface([1, 2], 1)

gmsh.model.geo.extrude([(2, 1)], 0, 0, 3, [6])

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("ring.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()
