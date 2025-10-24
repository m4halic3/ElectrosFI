import gmsh

gmsh.initialize()

x = 0
y = 0
z = 0
radius = 0.5

gmsh.model.occ.addSphere(x, y, z, radius)
gmsh.option.setNumber("Mesh.CharacteristicLengthMax", 0.3)

x = 1
y = 1
z = 1
width, height, depth = 1, 1, 1 

gmsh.model.occ.addBox(x, y, z, width, height, depth)

x = 2
y = 2
z = 2
width, height, depth = 2, 2, 2 

p1 = gmsh.model.occ.addPoint(x, y, z)
p2 = gmsh.model.occ.addPoint(x + width , y, z)
p3 = gmsh.model.occ.addPoint(x + width / 2, y + height, z)

l1 = gmsh.model.occ.addLine(p1, p2)
l2 = gmsh.model.occ.addLine(p2, p3)
l3 = gmsh.model.occ.addLine(p3, p1)

loop = gmsh.model.occ.addCurveLoop([l1, l2, l3])

base_surface = gmsh.model.occ.addPlaneSurface([loop])

gmsh.model.occ.extrude([(2, base_surface)], 0, 0, depth)

gmsh.model.occ.synchronize()
gmsh.model.mesh.generate(3)
gmsh.write("examples/python/tmp.msh")

gmsh.fltk.run()

gmsh.finalize()