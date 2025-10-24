import gmsh
import sys
import math

gmsh.initialize()

gmsh.model.add("cubo")

tm = 0.09
allp = 1

gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(allp, 0, 0, tm, 2)
gmsh.model.geo.addPoint(allp, allp, 0, tm, 3)
gmsh.model.geo.addPoint(0, allp, 0, tm, 4)

gmsh.model.geo.addLine(1, 2, 1)
gmsh.model.geo.addLine(2, 3, 2)
gmsh.model.geo.addLine(3, 4, 3)
gmsh.model.geo.addLine(4, 1, 4)

gmsh.model.geo.addCurveLoop([1, 2, 3, 4], 1)

gmsh.model.geo.addPlaneSurface([1], 1)

extruded = gmsh.model.geo.extrude([(2, 1)], 0, 0, allp)

gmsh.model.geo.synchronize()

volume_tags = [entity[1] for entity in extruded if entity[0] == 3]

if volume_tags:
    gmsh.model.addPhysicalGroup(3, volume_tags, 1)

gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("cubo.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()
