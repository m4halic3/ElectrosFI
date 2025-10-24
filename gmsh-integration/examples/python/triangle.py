import gmsh
import sys
import math

gmsh.initialize()

gmsh.model.add("triangle")

tm = 0.1
allp = 1

gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
gmsh.model.geo.addPoint(allp, 0, 0, tm, 2)
gmsh.model.geo.addPoint(allp/2, allp, 0, tm, 3)

gmsh.model.geo.addLine(1, 2, 1)
gmsh.model.geo.addLine(2, 3, 2)
gmsh.model.geo.addLine(3, 1, 3)

gmsh.model.geo.addCurveLoop([1, 2, 3], 1)

gmsh.model.geo.addPlaneSurface([1], 1)

gmsh.model.geo.extrude([(2, 1)], 0, 0, 1)

gmsh.model.geo.rotate([(3, 1)], 0, 0, 0, 0, 0, 1, math.pi/4)


gmsh.model.geo.synchronize()

gmsh.model.mesh.generate(3)

gmsh.write("triangle.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()
gmsh.finalize()

#inicia o gmsh
#gmsh.initialize()

#nomeia de "triangle"
#gmsh.model.add("triangle")

#define as variáveis tm(tamanho) e allp(all points)
#tm = 0.1
#allp = 1

#adiciona os pontos
#gmsh.model.geo.addPoint(0, 0, 0, tm, 1)
#gmsh.model.geo.addPoint(allp, 0, 0, tm, 2)
#gmsh.model.geo.addPoint(allp/2, allp, 0, tm, 3)

#adiciona as linhas
#gmsh.model.geo.addLine(1, 2, 1)
#gmsh.model.geo.addLine(2, 3, 2)
#gmsh.model.geo.addLine(3, 1, 3)

#transforma as linhas criadas em um curve looṕ
#gmsh.model.geo.addCurveLoop([1, 2, 3], 1)

#transforma o curve loop em uma superfície plana
#gmsh.model.geo.addPlaneSurface([1], 1)

#copia o triangulo para frente, para a posição desejada. 
#gmsh.model.geo.extrude([(2, 1)], 0, 0, 1, [6])

#sincroniza o código
#gmsh.model.geo.synchronize()

#gera a malha em 3D
#gmsh.model.mesh.generate(3)

#nomeia a malha de "triangle.msh"
#gmsh.write("triangle.msh")

#finizaliza o código
#if '-nopopup' not in sys.argv:
#    gmsh.fltk.run()
#gmsh.finalize()
