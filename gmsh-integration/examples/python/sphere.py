import gmsh
import sys
import math
gmsh.initialize(sys.argv)

gmsh.model.add("sphere")

radius = 5

gmsh.model.occ.addSphere(0, 0, 0, radius, 1)
gmsh.option.setNumber("Mesh.CharacteristicLengthMax", radius/100)
gmsh.model.occ.synchronize()
gmsh.model.mesh.generate(3)

gmsh.write("sphere.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()
