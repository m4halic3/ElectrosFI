# -*- coding: utf-8 -*-
import gmsh
import sys

# Inicializar o Gmsh
gmsh.initialize(sys.argv)

# Criar um novo modelo chamado "cube_with_cylinder"
gmsh.model.add("cube_with_prism")

# Parâmetros para o cubo e prisma
lado_cubo = 6
altura_prisma = 2  # Altura do prisma
largura_prisma = 1  # Largura da base do prisma
altura_base_prisma = 1  # Altura da base triangular do prisma
profundidade_prisma = 2  # Profundidade do prisma

# Calcular a posição centralizada para o prisma
centro_cubo = lado_cubo / 2
prisma_z = (lado_cubo - altura_prisma) / 2

# Criar o cubo com dimensões especificadas
cubo = gmsh.model.occ.addBox(0, 0, 0, lado_cubo, lado_cubo, lado_cubo)

# Criar os pontos da base triangular do prisma
p1 = gmsh.model.occ.addPoint(centro_cubo - largura_prisma / 2, centro_cubo - altura_base_prisma / 2, prisma_z)
p2 = gmsh.model.occ.addPoint(centro_cubo + largura_prisma / 2, centro_cubo - altura_base_prisma / 2, prisma_z)
p3 = gmsh.model.occ.addPoint(centro_cubo, centro_cubo + altura_base_prisma / 2, prisma_z)

# Criar as linhas da base triangular do prisma
l1 = gmsh.model.occ.addLine(p1, p2)
l2 = gmsh.model.occ.addLine(p2, p3)
l3 = gmsh.model.occ.addLine(p3, p1)

# Criar o loop de curvas e a superfície plana da base do prisma
loop = gmsh.model.occ.addCurveLoop([l1, l2, l3])
base_surface = gmsh.model.occ.addPlaneSurface([loop])

# Extrudar a superfície plana para criar o prisma
prisma = gmsh.model.occ.extrude([(2, base_surface)], 0, 0, profundidade_prisma)

# Sincronizar a construção do modelo
gmsh.model.occ.synchronize()

# Cortar o prisma do cubo para criar uma única entidade
gmsh.model.occ.cut([(3, cubo)], [(3, prisma[1][1])], removeTool=False)

# Sincronizar a construção do modelo
gmsh.model.occ.synchronize()

# Marcar o cubo com uma identificação específica
gmsh.model.addPhysicalGroup(3, [cubo], tag=1)
gmsh.model.setPhysicalName(3, 1, "air")

# Marcar o prisma com uma identificação específica
gmsh.model.addPhysicalGroup(3, [prisma[1][1]], tag=2)
gmsh.model.setPhysicalName(3, 2, "magnet")

# Definir as faces externas do cubo (condições de contorno)
faces_cubo = gmsh.model.getBoundary([(3, cubo)], oriented=False)
faces_externas = []
for face in faces_cubo:
    centro_face = gmsh.model.occ.getCenterOfMass(2, face[1])
    if (centro_face[0] == 0 or centro_face[0] == lado_cubo or
        centro_face[1] == 0 or centro_face[1] == lado_cubo or
        centro_face[2] == 0 or centro_face[2] == lado_cubo):
        faces_externas.append(face[1])

# Adicionar todas as faces externas do cubo ao grupo físico "cube_bc"
tag_externas = gmsh.model.addPhysicalGroup(2, faces_externas)
gmsh.model.setPhysicalName(2, tag_externas, "cube_bc")

# Definir as condições de contorno para as faces do prisma
faces_prisma = gmsh.model.getBoundary([(3, prisma[1][1])], oriented=False)
faces_prisma_bc = [face[1] for face in faces_prisma]

# Adicionar todas as faces do prisma ao grupo físico "prism_bc"
tag_prisma_bc = gmsh.model.addPhysicalGroup(2, faces_prisma_bc)
gmsh.model.setPhysicalName(2, tag_prisma_bc, "prism_bc")

# Definir parâmetros da malha
gmsh.option.setNumber("Mesh.CharacteristicLengthMin", 1)
gmsh.option.setNumber("Mesh.CharacteristicLengthMax", 2)

# Gerar a malha
gmsh.model.mesh.generate(3)

# Definir versão do arquivo MSH (formato ASCII por padrão)
gmsh.option.setNumber("Mesh.MshFileVersion", 2.2)

# Salvar a malha em um arquivo
gmsh.write("cubo_com_prisma.msh")

if '-nopopup' not in sys.argv:
    gmsh.fltk.run()

# Finalizar o Gmsh
gmsh.finalize()
print(faces_cubo)
