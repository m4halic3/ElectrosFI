const express = require('express');
const { Router } = require('express');
const routes = express.Router();
const Simulation = require('../model/simulation');



routes.get('/', async (req, res) => {
    try {
        const allSimulations = (!req.query.author) ?
            await Simulation.find() :
            await Simulation.find({ author: req.query.author });
        delete allSimulations.productions;
        res.json(allSimulations);
    } catch (err) {
        res.json({ err: err.message });
    }
});

routes.post('/', async (req, res) => {
    const {
        title,
        author,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        until,
        geometries,
        sources,
        coordinates,
        plotOptions,
        productions,
        flux,
        charts
    } = req.body;

    const newSimulation = new Simulation({
        title,
        author,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        until,
        geometries,
        sources,
        coordinates,
        plotOptions,
        productions,
        flux,
        charts
    });
    try {
        const savedSimulation = await newSimulation.save();
        res.json(savedSimulation);
    } catch (err) {
        res.json({ err: err.message });
    }
});

const getSimulationsFromAuthor = async (req, res) => {
    try {
        if (!req.params.where) throw new Error('Você precisa escolher um autor para ver suas simulações');

        let simulationFindedByAuthor = await Simulation.find({ author: req.params.where });

        if (await simulationFindedByAuthor) {
            var simulationFindedByAuthorWithoutProductions = await simulationFindedByAuthor.map((m) => {
                return {
                    title: m.title,
                    description: m.description,
                    author: m.author,
                    create_date: m.author,
                    _id: m._id
                }
            });
            res.json({ error: false, data: await simulationFindedByAuthorWithoutProductions });
            return;
        } else {
            throw new Error('Você precisa escolher um autor para ver suas simulações');
        }

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
}

const getSimulationByIdOrWhere = async (req, res) => {
    try {
        const { where, idSimulation, whereID, idAuthor } = req.params;
        const findedById = await Simulation.findById(idSimulation);
        if (!where) { res.json(await findedById); return; };

        const hasError = await findedById[where] ? false : true;
        let userResponse = { error: hasError };
        userResponse[where] = await findedById[where];

        if (whereID) {
            userResponse[where] = await findedById[where].filter(e => e._id == whereID);
        }

        res.json(userResponse);

    } catch (err) {
        res.json(err.message);
    }
}
routes.get('/:idSimulation/:where?/:whereID?', async (req, res) => {
    try {
        const { idSimulation } = req.params;
        if (idSimulation === 'author') {
            await getSimulationsFromAuthor(req, res);
        } else {
            await getSimulationByIdOrWhere(req, res);
        }
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});


const deleteSimulation = async (res, idSimulation) => {
    try {
        const removedSimulation = await Simulation.deleteOne({ _id: idSimulation });
        res.json({ error: false, data: await removedSimulation });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
}

const deleteItemFromSimulation = async (res, simulationID, item, itemID) => {
    try {
        const removedItemFromSimulation = await Simulation.updateOne({ _id: simulationID }, { $pull: { [item]: { _id: itemID } } });
        res.json({ error: false, data: await removedItemFromSimulation });

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
}

routes.delete('/:idSimulation/:where?/:whereID?', async (req, res) => {
    try {
        const { idSimulation, where, whereID } = req.params;
        if (!where) { deleteSimulation(res, idSimulation); return; }

        if (!whereID) { res.json({ error: true, message: `You need send a ${where} id` }); return; }
        deleteItemFromSimulation(res, idSimulation, where, whereID);

    } catch (err) {
        res.json(err.message);
    }
});

routes.patch('/:simulationId', async (req, res) => {
    const {
        title,
        author,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        until,
        geometries,
        sources,
        coordinates,
        plotOptions,
        productions,
        flux,
        charts
    } = req.body;

    try {
        if (geometries[0] === '"') {
            geometries = JSON.parse(geometries);
        }

        const updatedSimulation = await Simulation.updateOne({ _id: req.params.simulationId }, {
            $set: {
                title,
                author,
                resolution,
                description,
                scene_design,
                scene_simulation,
                default_material,
                until,
                geometries,
                sources,
                coordinates,
                plotOptions,
                productions,
                flux,
                charts
            }
        });
        res.json(updatedSimulation)
    } catch (err) {
        res.json({
            error: err.message, simulation: {
                title,
                author,
                resolution,
                description,
                scene_design,
                scene_simulation,
                default_material,
                until,
                geometries,
                sources,
                coordinates,
                plotOptions,
                productions,
                flux,
                charts
            }
        });
    }

});

module.exports = routes;