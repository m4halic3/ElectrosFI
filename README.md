# ElectrosFI
![](https://img.shields.io/badge/MIT-Meep-green)
![](https://img.shields.io/badge/Python-v3-Red)
![](https://img.shields.io/badge/Node-v12.0.1-green)
![](https://img.shields.io/badge/express-v4.17.1-green)
![](https://img.shields.io/badge/cors-v2.8.5-green)
![](https://img.shields.io/badge/Vue-v2.0-green)
![](https://img.shields.io/badge/Konva-v2.1.3-brown)


## 📖 Sobre o projeto  

A complexidade dos parâmetros e a demanda computacional para modelagem exigida no design de novos dispositivos fotônicos aumentaram significativamente nos últimos anos. Isso tem exigido que empresas que atuam na área de telecomunicações incluam em sua equipe especialistas em modelagem numérica e infraestrutura computacional para manter o parque necessário para atender a essas demandas. Além disso, o custo financeiro exige aquisições frequentes e manutenção de sistemas de computação de alto desempenho para processamento e armazenamento de dados. Isso pode impedir que startups e/ou pequenas empresas os desenvolvam.

Nesse cenário, este projeto pretende desenvolver um ambiente web focado na modelagem de dispositivos fotônicos 2D seguindo os conceitos de computação em nuvem, oferecendo assim um Software como Serviço (SaaS). Portanto, este projeto se justifica pelo desenvolvimento de uma interface simples e prática para modelagem desses dispositivos e simulações, utilizando bibliotecas numéricas disponíveis na Internet, como o método baseado em FDTD (Finite Difference Time Domain) e outras bibliotecas baseadas em Elementos Finitos desenvolvidas por alguns colegas.

### | Hipóteses levantadas
- É possível modelar **geometrias 2D e 3D** diretamente em navegadores web.  
- Tecnologias numéricas e de modelagem podem ser integradas em um **simulador em nuvem**.  
- Técnicas de **Inteligência Artificial** podem otimizar dispositivos de telecomunicações.  
- Um simulador em nuvem pode ser acessado inclusive em **dispositivos móveis (Mobile)**.  

### | Objetivos
- **Geral**: Simular fenômenos eletromagnéticos em uma nuvem computacional, com foco em dispositivos ópticos.  
- **Específicos**:  
  - Desenvolver uma plataforma **fácil de usar**, robusta e sem necessidade de instalações complexas.  
  - Atender cientistas, engenheiros e estudantes com acessibilidade.  
  - Permitir **mobilidade e colaboração**, possibilitando levar simulações para qualquer lugar.  

### | Fundamentação
- **Web**: design escalável e manutenível, PWA (Progressive Web App), foco em UX e usabilidade.  
- **Numérica**: métodos **FEM (Finite Element Method)** e **FDTD (Finite-Difference Time-Domain)** para simulações no domínio da frequência e do tempo.  
- **HPC (High Performance Computing)**: utilização de recursos de alto desempenho na nuvem.  
- **Entrada e saída**: geração de malha, processamento numérico e visualização gráfica dos resultados.  

### | Metodologia
O projeto segue o conceito de **Software as a Service (SaaS)**, priorizando:  
- Escalabilidade de infraestrutura;  
- Facilidade de uso e suporte;  
- Colaboração e compartilhamento;  
- Portabilidade e integração com mídias sociais.  
---

## 📁 Estrutura de Pastas que deverão ser acessadas para rodar o projeto
```bash
.
├── 2025_ElectrosFI/               # Pasta raiz do projeto principal
│   ├── 3d-ngsolve-simulation/     # Simulações em 3D usando NGSolve (biblioteca de FEM - método dos elementos finitos)
│   ├── electrosfi-3d-interface/   # Interface 3D do projeto ElectrosFI (parte visual e interação)
│   │   ├── electrosfi/            # Provavelmente o núcleo da aplicação/interface (frontend principal em 3D)
│   │   ├── electrosfi-backend/    # Backend da aplicação (API, lógica de negócio, integração com simulações)
│   │   └── pythonMeep-master      # Integração com MEEP (simulação eletromagnética em Python)
│   ├── electrosfi-kong-setup/     # Configuração do Kong API Gateway (orquestração de serviços / microservices)
│   │   └── docker-kong/           # Dockerização do Kong para rodar no projeto
│   │       ├── compose/           # Arquivos Docker Compose para subir o Kong e serviços relacionados
│   ├── gmsh-integration/          # Integração com Gmsh (gerador de malhas para simulações numéricas)
│   └── nlopt_integration/         # Integração com NLopt (biblioteca de otimização numérica)
└── README.md                      

 ```
- Cada subpasta possui um README específico com instruções de uso e descrição do módulo.

## 💻 Instalação e Execução
### | 1. Clone todos os repositórios necessários
```bash
# Kong Setup (API Gateway e orquestração)
git clone https://github.com/electrosfi-org/electrosfi-kong-setup

# Interface Web (Frontend Vue.js)
git clone https://github.com/leonardoDluz/electrosfi-3d-interface

# Simulação 3D com Ngsolve
git clone https://github.com/electrosfi-org/3d-ngsolve-simulation

# Integração com Gmsh
git clone https://github.com/electrosfi-org/gmsh-integration

# Integração com Nlopt
git clone https://github.com/electrosfi-org/nlopt_integration
```
### | 2. Entre em cada pasta 
**Cada repositório possui seu próprio README.md com instruções específicas de instalação, configuração e execução.**
Após clonar, acesse cada pasta e siga os passos descritos.

#### | Exemplo:
```bash
cd 3d-ngsolve-simulation
# siga as instruções do README deste repositório
```

# Agradecimentos 
Esse projeto é financeiramente fomentado em partes pela FAPESP, CNPq e SETEC/MEC. Tecnicamente mantido pelo IFSP, Campus Itapetininga.

<img src="https://user-images.githubusercontent.com/22857183/90028430-0970a500-dc90-11ea-9e34-88ef29c5bd25.png" width="100" style="float:left; margin-right:20px;"/> 
<img src="https://www.gov.br/cnpq/pt-br/canais_atendimento/identidade-visual/CNPq_v2017_rgb.jpg" width="100" style="float:left; margin-right:20px">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPR5dSf3Xw04EmpxgEgrA9usDS40s1qRtKA&s" width="100" style="float:left;"/><br><br>

## 👥 Colaboradores
<a href="https://github.com/santoschs"><img src="https://github.com/santoschs.png?size=80" width="50" style="border-radius:50%">
<a href="https://github.com/guilhermemarim"><img src="https://github.com/guilhermemarim.png?size=50" width="50" style="border-radius:50%">
<a href="https://github.com/paulhenrique"><img src="https://github.com/paulhenrique.png?size=50" width="50" style="border-radius:50%">
<a href="https://github.com/leonardoDluz"><img src="https://github.com/leonardoDluz.png?size=50" width="50" style="border-radius:50%">
<a href="https://github.com/Rafael-Jose-SV"><img src="https://github.com/Rafael-Jose-SV.png?size=50" width="50" style="border-radius:50%">
<a href="https://github.com/Carlos-Nyckolas"><img src="https://github.com/Carlos-Nyckolas.png?size=50" width="50" style="border-radius:50%">
<a href="https://github.com/m4halic3"><img src="https://github.com/m4halic3.png?size=50" width="50" style="border-radius:50%">





