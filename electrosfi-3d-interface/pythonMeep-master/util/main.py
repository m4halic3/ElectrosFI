from __future__ import division

import meep as mp
import numpy as np
import matplotlib.pyplot as plt
import base64 as b64
import json
import io
import tempfile
import os.path
import datetime 
import math

def FieldsWaveguide(data):
    cell = mp.Vector3(
        data['coordinates']['x'],
        data['coordinates']['y'],
        data['coordinates']['z']
    )

    simulationFolder = createUserPath(data)
    fileNameMain = generateFileName(data)

    pml_layers = [mp.PML(thickness=data['pml']['thickness'])]
    mp.quiet(True)

    sources_content_controll = constructSourceData(data)

    fluxView = []
    if(len(data["flux"]) > 0):
        fluxes = data["flux"]
        for flux in fluxes:
            if(flux["type"] == "transmittance_spectrum"):
                dataFlux = generateTransmittanceSpectrum(
                    flux,
                    data,
                    cell,
                    sources_content_controll,
                    pml_layers,
                    simulationFolder,
                    fileNameMain)
                fluxView.append(dataFlux)
            elif(flux["type"] == "transmission_spectrum"):
                dataFlux = generateTransmissionSpectrumTest(flux, simulationFolder, fileNameMain)
                # dataFlux = generateTransmissionSpectrum(
                #     flux, data, cell, sources_content_controll, pml_layers)
                fluxView.append(dataFlux)

        geometry_content_controll = constructGeometry(data)
        sim = mp.Simulation(
            cell_size=cell,
            boundary_layers=pml_layers,
            sources=sources_content_controll,
            geometry=geometry_content_controll,
            resolution=data["resolution"],
            default_material=mp.Medium(epsilon=data["default_material"]),
        )
    else:
        geometry_content_controll = constructGeometry(data)
        sim = mp.Simulation(
            cell_size=cell,
            boundary_layers=pml_layers,
            sources=sources_content_controll,
            geometry=geometry_content_controll,
            resolution=data["resolution"],
            default_material=mp.Medium(epsilon=data["default_material"]),
        )

    plotAxis = getPlotAxis(data)

    realtime = True
    if(data["plotOptions"]["realtime"] != 1):
        realtime = False

    labels = True
    if(data["plotOptions"]["labels"] != 1):
        labels = False

    if (data["plotOptions"]["field_parameters"] != 0):
        field_parameters = {
            'alpha':        data["plotOptions"]["field_parameters"]["alpha"],
            'cmap':         data["plotOptions"]["field_parameters"]["cmap"],
            'interpolation':    data["plotOptions"]["field_parameters"]["interpolation"]
        }
    else:
        field_parameters = None

    if (data["plotOptions"]["boundary_parameters"] != 0):
        boundary_parameters = {
            'hatch':        data["plotOptions"]["boundary_parameters"]["hatch"],
            'linewidth':        data["plotOptions"]["boundary_parameters"]["linewidth"],
            'facecolor':        data["plotOptions"]["boundary_parameters"]["facecolor"],
            'edgecolor':        data["plotOptions"]["boundary_parameters"]["edgecolor"],
            'alpha':        data["plotOptions"]["boundary_parameters"]["alpha"],
        }
    else:
        boundary_parameters = None

    if(data["plotOptions"]["source_parameters"] != 0):
        source_parameters = {
            'color':        data["plotOptions"]["source_parameters"]["color"],
            'alpha':        data["plotOptions"]["source_parameters"]["alpha"],
            'facecolor':    data["plotOptions"]["source_parameters"]["facecolor"],
            'edgecolor':    data["plotOptions"]["source_parameters"]["edgecolor"],
            'linewidth':    data["plotOptions"]["source_parameters"]["linewidth"],
            'hatch':        data["plotOptions"]["source_parameters"]["hatch"],
            'label_color':  data["plotOptions"]["source_parameters"]["label_color"],
            'label_alpha':  data["plotOptions"]["source_parameters"]["label_alpha"],
            'offset':       data["plotOptions"]["source_parameters"]["offset"]
        }
    else:
        source_parameters = None

    if(data["plotOptions"]["monitor_parameters"] != 0):
        monitor_parameters = {
            'color':        data["plotOptions"]["monitor_parameters"]["color"],
            'alpha':        data["plotOptions"]["monitor_parameters"]["alpha"],
            'facecolor':    data["plotOptions"]["monitor_parameters"]["facecolor"],
            'edgecolor':    data["plotOptions"]["monitor_parameters"]["edgecolor"],
            'linewidth':    data["plotOptions"]["monitor_parameters"]["linewidth"],
            'hatch':        data["plotOptions"]["monitor_parameters"]["hatch"],
            'label_color':  data["plotOptions"]["monitor_parameters"]["label_color"],
            'label_alpha':  data["plotOptions"]["monitor_parameters"]["label_alpha"],
            'offset':       data["plotOptions"]["monitor_parameters"]["offset"]
        }
    else:
        monitor_parameters = None

    if(data["plotOptions"]["eps_parameters"] != 0):
        eps_parameters = {
            'alpha':        data["plotOptions"]["eps_parameters"]["alpha"],
            'interpolation': data["plotOptions"]["eps_parameters"]["interpolation"],
            'cmap':         data["plotOptions"]["eps_parameters"]["cmap"]
        }
    else:
        eps_parameters = None

    videoName = ''
    if(data["plotOptions"]["generateVideo"] == 1):
        animate = mp.Animate2D(sim,
                               fields=plotAxis,
                               realtime=realtime,
                               field_parameters=field_parameters,
                               boundary_parameters=boundary_parameters,
                               source_parameters=source_parameters,
                               monitor_parameters=monitor_parameters
                               )
        sim.restart_fields()
        sim.run(mp.at_every(1, animate), until=int(
            data["plotOptions"]["until"]))

        videoName = simulationFolder + fileNameMain + ".mp4"
        animate.to_mp4(fps=10, filename=videoName)

    plotDielectric = ''
    if(data["plotOptions"]["generateDielectric"] == 1):
        sim.restart_fields()
        sim.run(until=int(data["plotOptions"]["until"]))
        eps_data = sim.get_array(
            component=mp.Dielectric, size=cell, center=mp.Vector3())
        content = eps_data.transpose().tolist()
        plotDielectric = writeJSONFile(
            simulationFolder, fileNameMain + '_plotDielectric', content)

    plot2D = ''
    if(data["plotOptions"]["generateAxis"] == 1):
        if(data["plotOptions"]["plotViews"]["eps_flag"] == 1):
            eps_flag_plot = True
        else:
            eps_flag_plot = False

        if(data["plotOptions"]["plotViews"]["sources_flag"] == 1):
            sources_flag_plot = True
        else:
            sources_flag_plot = False

        if(data["plotOptions"]["plotViews"]["monitor_flag"] == 1):
            monitor_flag_plot = True
        else:
            monitor_flag_plot = False

        if(data["plotOptions"]["plotViews"]["boundaries_flag"] == 1):
            boundaries_flag_plot = True
        else:
            boundaries_flag_plot = False

        eps_data = sim.get_array(
            component=plotAxis, size=cell, center=mp.Vector3())

        content = eps_data.transpose().tolist()
        plot2D = writeJSONFile(
            simulationFolder, fileNameMain + '_plot2D', content)

        # plt.figure()
        # sim.plot2D(
        #     fields=plotAxis,
        #     field_parameters=field_parameters,
        #     boundary_parameters=boundary_parameters,
        #     source_parameters=source_parameters,
        #     monitor_parameters=monitor_parameters,
        #     plot_eps_flag=eps_flag_plot,
        #     plot_sources_flag=sources_flag_plot,
        #     plot_monitors_flag=monitor_flag_plot,
        #     plot_boundaries_flag=boundaries_flag_plot
        # )
        # plt.show()
    
    try:
        return json.dumps(
            {
                "scene": plotDielectric,
                "wave_scene": plot2D,
                "videoName": videoName,
                "fluxes": fluxView,
            },
            sort_keys=True,
            indent=4,
        )
    except Exception as e:
        return e


def constructGeometry(data):
    temp = []
    for content in data['geometries']:
        position = content["position"]
        size = content["size"]
        typeOfGeometry = content["shape"]
        rotation = content["rotation"]
        materialOfGeometry = mp.Medium(epsilon=content["epsilon"])

        if (typeOfGeometry == "block"):
            currentGeometryData = mp.Block(
                size=mp.Vector3(size[0], size[1], mp.inf),
                center=mp.Vector3(position[0], position[1]),
                e1=mp.Vector3(x=1).rotate(mp.Vector3(z=1), math.radians(-1 * rotation)),
                e2=mp.Vector3(y=1).rotate(mp.Vector3(z=1), math.radians(-1 * rotation)),
                material=mp.Medium(epsilon=content["epsilon"])
            )
        elif (typeOfGeometry == "sphere"):
            currentGeometryData = mp.Sphere(
                center=mp.Vector3(position[0], position[1]),
                radius=size[0],
                material=mp.Medium(epsilon=content["epsilon"])
            )
        elif (typeOfGeometry == "ellipsoid"):
            currentGeometryData = mp.Ellipsoid(
                size=mp.Vector3(size[0], size[1], mp.inf),
                center=mp.Vector3(position[0], position[1]),
                material=materialOfGeometry
            )

        temp.append(currentGeometryData)

    return temp

def constructSourceData(data):
    sources_content_controll = []

    for content in data['sources']:
        wavelength = content["waveLength"]
        width = content["waveWidth"]
        fwidth = content["fwidth"]
        frequency = content["frequency"]
        size = content["waveSize"]
        position = content["position"]
        if(content["integrated"] == 1):
            integrated = True
        else:
            integrated = False

        if(content["component"] == "Ex"):
            component = mp.Ex
        elif(content["component"] == "Ey"):
            component = mp.Ey
        elif(content["component"] == "Ez"):
            component = mp.Ez
        elif(content["component"] == "Hx"):
            component = mp.Hx
        elif(content["component"] == "Hy"):
            component = mp.Hy
        elif(content["component"] == "Hz"):
            component = mp.Hz

        if(content["sourceType"] == "gaussian"):
            continuousSourceVar = mp.GaussianSource(
                wavelength=wavelength,
                width=width,
                fwidth=fwidth,
                frequency=frequency,
                is_integrated=integrated
            )
        elif(content["sourceType"] == "continuous"):
            continuousSourceVar = mp.ContinuousSource(
                wavelength=wavelength,
                width=width,
                frequency=frequency,
                is_integrated=integrated
            )

        currentSourceData = mp.Source(
            continuousSourceVar,
            component=component,
            center=mp.Vector3(position[0], position[1]),
            size=mp.Vector3(size[0], size[1]),
        )

        sources_content_controll.append(currentSourceData)

    return sources_content_controll


def generateTransmittanceSpectrum(flux, data, cell, sources_content_controll, pml_layers, simulationFolder, fileNameMain):
    reflected_flux = flux["reflected_flux"]
    transmittance_flux = flux["transmittance_normal_flux"]
    transmittance_flux_obs = flux["transmittance_flux"]
    geometry = constructGeometry(data)
    sim = mp.Simulation(cell_size=cell,
                        boundary_layers=pml_layers,
                        geometry=geometry,
                        sources=sources_content_controll,
                        resolution=data["resolution"])

    refl_fr = mp.FluxRegion(
        center=mp.Vector3(
            reflected_flux["center"]["x"],
            reflected_flux["center"]["y"],
            reflected_flux["center"]["z"]
        ),
        size=mp.Vector3(
            reflected_flux["size"]["x"],
            reflected_flux["size"]["y"],
            reflected_flux["size"]["z"]
        ),
        direction=mp.Y
    )

    refl = sim.add_flux(
        flux["fcen"], flux["df"], flux["nfreq"], refl_fr)

    tran_fr = mp.FluxRegion(
        center=mp.Vector3(
            transmittance_flux["center"]["x"],
            transmittance_flux["center"]["y"],
            transmittance_flux["center"]["z"]
        ),
        size=mp.Vector3(
            transmittance_flux["size"]["x"],
            transmittance_flux["size"]["y"],
            transmittance_flux["size"]["z"]
        ),
        direction=mp.Y
    )
    tran = sim.add_flux(
        flux["fcen"],
        flux["df"],
        flux["nfreq"],
        tran_fr
    )

    sim.run(until=flux["run_norm"])
    straight_refl_data = sim.get_flux_data(refl)

    straight_tran_flux = mp.get_fluxes(tran)
    sim.reset_meep()

    geometry_content_controll = constructGeometry(data)

    sim = mp.Simulation(
        cell_size=cell,
        boundary_layers=pml_layers,
        sources=sources_content_controll,
        geometry=geometry_content_controll,
        resolution=data["resolution"],
        default_material=mp.Medium(
            epsilon=data["default_material"]
        ),
    )

    refl_flux_new = sim.add_flux(
        flux["fcen"],
        flux["df"],
        flux["nfreq"],
        refl_fr
    )

    tran_fr_new = mp.FluxRegion(center=mp.Vector3(
        transmittance_flux_obs["center"]["x"],
        transmittance_flux_obs["center"]["y"],
        transmittance_flux_obs["center"]["z"]
    ),
        size=mp.Vector3(
            transmittance_flux_obs["size"]["x"],
            transmittance_flux_obs["size"]["y"],
            transmittance_flux_obs["size"]["z"]
    ),
        direction=mp.Y
    )

    tran_flux_new = sim.add_flux(
        flux["fcen"],
        flux["df"],
        flux["nfreq"],
        tran_fr_new
    )

    sim.load_minus_flux_data(refl_flux_new, straight_refl_data)
    sim.run(until=data["plotOptions"]["until"])

    bend_refl_flux = mp.get_fluxes(refl_flux_new)
    bend_tran_flux = mp.get_fluxes(tran_flux_new)

    flux_freqs = mp.get_flux_freqs(refl_flux_new)

    wl = []
    Rs = []
    Ts = []
    for j in range(flux["nfreq"]):
        wl = np.append(wl, 1/flux_freqs[j])
        Rs = np.append(
            Rs, -bend_refl_flux[j]/straight_tran_flux[j])
        Ts = np.append(Ts, bend_tran_flux[j]/straight_tran_flux[j])
    loss = 1-Rs-Ts
    dataFlux = {}
    dataFlux["type"] = "scatter"
    dataFlux["row1"] = {
        "x": wl.tolist(),
        "y": Rs.tolist(),
        "title": 'reflectance'
    }
    dataFlux["row2"] = {
        "x": wl.tolist(),
        "y": Ts.tolist(),
        "title": 'transmittance'
    }
    dataFlux["row3"] = {
        "x": wl.tolist(),
        "y": loss.tolist(),
        "title": 'loss'
    }
    fileName = fileNameMain + "_flux_" 
    fileName += str(flux["fcen"])
    fileName += "_" + str(flux["df"])
    fileName += "_" + str(flux["nfreq"])

    return writeJSONFile(simulationFolder, fileName, dataFlux)


def generateTransmissionSpectrum(flux, data, cell, sources_content_controll, pml_layers):
    size = flux["normalization_geometry"]["size"]
    position = flux["normalization_geometry"]["position"]
    epsilon = flux["normalization_geometry"]["epsilon"]
    transmission_flux = flux["transmittance_flux"]
    normalization_geometry = [mp.Block(
        size=mp.Vector3(size[0], size[1], mp.inf),
        material=mp.Medium(epsilon=epsilon)
    )]

    sources = constructSourceData(data)

    sim = mp.Simulation(cell_size=cell,
                        geometry=normalization_geometry,
                        sources=sources,
                        boundary_layers=[mp.PML(1)],
                        resolution=data["resolution"])

    freg = mp.FluxRegion(center=mp.Vector3(
        transmission_flux["center"]["x"]
    ), size=mp.Vector3(
        transmission_flux["size"]["x"],
        transmission_flux["size"]["y"],
    ),
    direction=mp.Y
    )

    # freg = mp.FluxRegion(center=mp.Vector3(4.7),
    #                  size=mp.Vector3(0, 2.4))

    # trans = sim.add_flux(flux["fcen"], flux["df"], flux["nfreq"], freg)
    trans = sim.add_flux(0.25, 0.2, 500, freg)
    sim.run(until=700)
    # exit()

    geometry_content_controll = constructGeometry(data)
    print(geometry_content_controll)
    sim = mp.Simulation(cell_size=cell,
                        geometry=geometry_content_controll,
                        sources=sources,
                        boundary_layers=[mp.PML(1)],
                        resolution=data["resolution"])

    trans2 = sim.add_flux(0.25, 0.2, 500, freg)
    sim.run(until=700)

    fl = np.array(mp.get_fluxes(trans))
    fl2 = np.array(mp.get_fluxes(trans2))
    print(fl2)
    print(fl)
    print(trans)
    print(trans2)
    exit()
    normalizacao = fl2/fl
    maior = np.amax(normalizacao)
    reduzido = normalizacao/maior
    frequencias = mp.get_flux_freqs(trans2)

    dataFlux = {}
    dataFlux["type"] = "scatter"
    dataFlux["row1"] = {
        "x": frequencias,
        "y": reduzido.tolist(),
        "title": 'reflectance'
    }

    # plt.figure()
    # plt.plot(frequencias, reduzido)
    # phow()

    return dataFlux


def getPlotAxis(data):
    plotAxis = mp.Hz
    if(data["plotOptions"]["plotAxis"] == "Ex"):
        plotAxis = mp.Ex
    elif(data["plotOptions"]["plotAxis"] == "Ey"):
        plotAxis = mp.Ey
    elif(data["plotOptions"]["plotAxis"] == "Ez"):
        plotAxis = mp.Ez
    elif(data["plotOptions"]["plotAxis"] == "Hx"):
        plotAxis = mp.Hx
    elif(data["plotOptions"]["plotAxis"] == "Hy"):
        plotAxis = mp.Hy
    elif(data["plotOptions"]["plotAxis"] == "Hz"):
        plotAxis = mp.Hz

    return plotAxis


def generateTransmissionSpectrumTest(flux, simulationFolder, fileNameMain):
    resolution = 10  # pixels/um

    cell = mp.Vector3(12.4, 6, 0)

    geometry = [mp.Block(size=mp.Vector3(mp.inf, 1.2, mp.inf),
                         material=mp.Medium(epsilon=13))]

    sources = [mp.Source(mp.GaussianSource(0.25, fwidth=0.2),
                         component=mp.Ey,
                         center=mp.Vector3(-5.2),
                         size=mp.Vector3(0, 1.2))]

    sim = mp.Simulation(cell_size=cell,
                        geometry=geometry,
                        sources=sources,
                        boundary_layers=[mp.PML(1)],
                        resolution=20)

    # transmitted flux
    freg = mp.FluxRegion(center=mp.Vector3(4.7),
                         size=mp.Vector3(0, 2.4))

    trans = sim.add_flux(0.25, 0.2, 500, freg)  # transmitted flux

    # sim.run(until_after_sources=mp.stop_when_fields_decayed(
    # 50, mp.Ey, mp.Vector3(4.7), 1e-3))
    # sim.run(until=20) #old 700
    sim.run(until_after_sources=mp.stop_when_fields_decayed(
        50, mp.Ey, mp.Vector3(4.7), 1e-3))

    '''
    ======================

    Verificação das Frequências

    ======================
    '''

    geometry.append(mp.Sphere(0.36, center=mp.Vector3(0.7)))
    geometry.append(mp.Sphere(0.36, center=mp.Vector3(-0.7)))
    geometry.append(mp.Sphere(0.36, center=mp.Vector3(1.7)))
    geometry.append(mp.Sphere(0.36, center=mp.Vector3(-1.7)))
    geometry.append(mp.Sphere(0.36, center=mp.Vector3(2.7)))
    geometry.append(mp.Sphere(0.36, center=mp.Vector3(-2.7)))

    sim = mp.Simulation(cell_size=cell,
                        geometry=geometry,
                        sources=sources,
                        boundary_layers=[mp.PML(1)],
                        resolution=20)

    # transmitted flux
    trans2 = sim.add_flux(0.25, 0.2, 500, freg)

    sim.run(until_after_sources=mp.stop_when_fields_decayed(
        50, mp.Ey, mp.Vector3(4.7), 1e-3)
        )

    sim.plot2D(fields=mp.Ey)

    '''
    ======================
    Plot dos gráficos de visualização:
    ======================
    '''
    fl = np.array(mp.get_fluxes(trans))
    fl2 = np.array(mp.get_fluxes(trans2))
    normalizacao = fl2/fl
    maior = np.amax(normalizacao)
    reduzido = normalizacao/maior
    frequencias = mp.get_flux_freqs(trans2)

    dataFlux = {}
    dataFlux["type"] = "scatter"
    dataFlux["row1"] = {
        "x": frequencias,
        "y": reduzido.tolist(),
        "title": 'reflectance'
    }

    # plt.figure()
    # plt.plot(frequencias, reduzido)
    # plt.show()

    fileName = fileNameMain + "_flux_"
    fileName += str(flux["fcen"])
    fileName += "_" + str(flux["df"])
    fileName += "_" + str(flux["nfreq"])

    return writeJSONFile(simulationFolder, fileName, dataFlux)


def createUserPath(data):
    userFolder = "./storage/users/" + data["author"]+"/"
    simulationFolder = userFolder + data["simulation"] + "/"
    if not os.path.exists(userFolder):
        try:
            os.mkdir(userFolder)
            os.mkdir(simulationFolder)
        except OSError as e:
            raise Exception('Incorrect data: Error at folder creating :' + str(e))
    elif not os.path.exists(simulationFolder):
        try:
            os.mkdir(simulationFolder)
        except OSError:
            raise Exception('Incorrect data: Error at folder user creating' + str(e))

    return simulationFolder


def generateFileName(data):
    date = datetime.datetime.now()
    day = str(date.strftime("%d"))
    month = str(date.strftime("%m"))
    year = str(date.year)
    hour = str(date.strftime("%H"))
    minute = str(date.strftime("%M"))
    second = str(date.strftime("%S"))

    fileNameMain = year + "_"+ month+ "_"+ day+ "_"+ hour+ "_"+ minute+ "_"+ second+ "_"
    fileNameMain += str(data["plotOptions"]["plotAxis"]) + "_cell_"
    fileNameMain += str(data["coordinates"]["x"]) + "x"
    fileNameMain += str(data["coordinates"]["y"])
    fileNameMain += "_until_" + str(data["plotOptions"]["until"])
    return fileNameMain


def writeJSONFile(simulationFolder, fileNameMain, content):
    nameFileToSave = simulationFolder + fileNameMain + ".json"
    f = open(nameFileToSave, "w")
    f.write(json.dumps(content))
    return nameFileToSave
