const express = require("express");
const spawn = require("child_process").spawn;
const routes = express.Router();

/**
 * Define os headers para execução
 * @param {req:Request, res:Response}
 * @author paulhenrique
 */
const defineHeaders = function (res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setTimeout(120 * 60 * 1000, function () {
    res.status(408).json("Request has timed out.");
  });
};

/**
 * Rota de execução das simulações
 * @param {req:Request, res:Response}
 * @author paulhenrique
 */
routes.use("/exec", (req, res) => {
  defineHeaders(res);

  try {
    const {
      title,
      author,
      simulation,
      resolution,
      description,
      scene_design,
      scene_simulation,
      default_material,
      until,
      geometries,
      pml,
      sources,
      coordinates,
      plotOptions,
      flux,
    } = req.body;

    var command = "python3";
    var folder = "./util/init.py";

    var args = [
      folder,
      "--data",
      JSON.stringify({
        title,
        author,
        simulation,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        until,
        geometries,
        pml,
        sources,
        coordinates,
        plotOptions,
        flux,
      }),
    ];

    const pythonSpawn = spawn(command, args);
    pythonSpawn.stdin.setDefaultEncoding("utf-8");

    var dataString = "";
    var error = false;

    pythonSpawn.stderr.on("data", (data) => {
      error = true;
      console.log("error" + data.toString());
      dataString += data.toString();
    });

    pythonSpawn.stdout.on("data", (data) => {
      console.log(data.toString());
      dataString += data.toString();
    });

    pythonSpawn.stdout.on("end", () => {
      console.log(dataString);
      var lastChar = dataString.search("Elapsed run time");
      dataString = dataString.substr(0, lastChar);
      console.log(dataString);
      if (error || dataString.includes("meep")) {
        res.json({ error: true, data: dataString });
        return;
      }

      console.log(dataString);
      var response = dataString;
      res.json({
        error: false,
        data: response,
        context: "Execution ends",
        dataString,
        test: "testttt",
      });
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
      context: "Execution ends at exception",
    });
  }
});

/**
 * Rota de exemplo das submissões de simulação
 * @param {req:Request, res:Response}
 * @author paulhenrique
 */

routes.get("/", (req, res) => {
  let title = "Simulation title",
    author = "Author uid",
    resolution = "resolution of the simulation render",
    description = "description of the simulation",
    scene_design = "scene design created before the simulation render",
    scene_simulation = "scene result of the simulation render",
    default_material = "material base of the plan",
    until = "until where the simulation will go",
    pml = {
      thickness: "width of the pml layer",
    },
    geometries = [(position = ["PositionX", "PositionY"])],
    sources = [],
    coordinates = {
      x: "The x axis size in the simulation plan",
      y: "The y axis size in the simulation plan",
      z: "The z axis size in the simulation plan",
    };

  res.json({
    title,
    author,
    resolution,
    description,
    scene_design,
    scene_simulation,
    default_material,
    until,
    pml,
    geometries,
    sources,
    coordinates,
  });
});

module.exports = routes;
