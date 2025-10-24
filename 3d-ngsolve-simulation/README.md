# 3d-ngsolve-simulation


## Example Request

Mapear o volume no docker-compose.yml de onde os arquivos .msh serão gerados.

Chamar a rota {HOST}:{PORT}/simulate para fazer a simulação.

Exemplo para uma geometria composta de um cubo com um cilindro transversal no centro de permeabilidada relativa distinta (mu_r).

```
{	
    "simulation_id": "electrosFi_cubo_com_cilindro",
	"gmsh_mesh_path": "cubo_com_cilindro.msh",
	"materials": [
		{   
            "name": "air",
			"refraction_index": 1,
            "mu_r": 1.0
		},
        {   
            "name": "magnet",
			"refraction_index": 1,
            "mu_r": 10
		}
	],
	"sources": [
		{
			"wavelength": 2.0,
			"wave_width": 0.1,
			"source_position": [0.1,0.1,0.1]
		}
	]
}
```

Exemplo para uma geometria única de um cubo.

```
{	
    "simulation_id": "electrosFi_cubo",
	"gmsh_mesh_path": "cubo.msh",
	"materials": [
		{   
            "name": "air",
			"refraction_index": 1,
            "mu_r": 1.0
		}
	],
	"sources": [
		{
			"wavelength": 2.0,
			"wave_width": 0.1,
			"source_position": [0.1,0.1,0.1]
		}
	]
}
```

simulation_id --> ID da simulação (obrigatório)

gmsh_mesh_path --> Nome do arquivo .msh, se o volume tiver mapeado, apena com o nome, como no exemplo "cubo.msh", será necessário. (obrigatório)

materials --> lista de materiais das geometrias compostas na malha. (obrigatório)
    
name --> mesmo nome usado no physicalGroup do gerador de malhas GMSH. (obrigatório)

refraction_index --> indíce de refração usado para cálculo da permissividade. Não está sendo usado (Opcional)

mu_r --> Permeabilidade relativa (mu_r). Senão informado será considerado 1. (Opcionalq)

sources --> Lista de fontes de onda. Por enquanto o código não trabalha com mais de uma. (obrigatório)

wavelength --> Comprimento de onda. (obrigatório)

wave_width --> Largura de banda. (obrigatório)

source_position --> Tupla com a posição (x,y,z) da localização da fonte. (obrigatório)
