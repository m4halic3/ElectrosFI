const app = require('express');
const route = app.Router();
const Material = require('../model/material');
const { json } = require('body-parser');


route.get('/', async (req, res) => {
    try {
        const allMaterials = (!req.query.author) ?
            await Material.find() :
            await Material.find({ author: req.query.author });
        res.json(allMaterials);
    } catch (err) {
        res.json({ err: err.message });
    }
});

route.post('/', async (req, res) => {
    const {
        title,
        refraction_index,
        color,
        author,
        description,
        reutilizable,
        public
    } = req.body;

    const newMaterial = new Material({
        title,
        refraction_index,
        color,
        author,
        description,
        reutilizable,
        public
    });

    try {
        const savedMaterial = await newMaterial.save();
        res.json(savedMaterial);
    } catch (err) {
        res.json({ err: err.message });
    }
});

route.get('/:materialId', async (req, res) => {

    try {
        const findedById = await Material.findById(req.params.materialId);
        // releaseEvents.json(findedById);
        res.json(findedById);
    } catch (err) {
        res.json({ err: err.message });
    }

});

// route.get('/author/:authorId', (req, res) => {

//     try {
//         const findedByAuthor = Material.find({author:req.params.authorId});
//         releaseEvents.json(findedByAuthor);
//     } catch (err) {
//         res.json({ err: err.message });
//     }

// })

route.delete('/:materialId', async (req, res) => {
    try {
        const removedMaterial = await Material.deleteOne({ _id: req.params.materialId });
        res.json(removedMaterial);
    } catch (err) {
        res.json({ err: err.message })
    }
});

route.patch('/:materialId', async (req, res) => {
    try {
        const {
            title,
            refraction_index,
            color,
            author,
            description,
            reutilizable,
            public
        } = req.body;

        const updatedMaterial = await Material.updateOne({ _id: req.params.materialId }, {
            $set: {
                title,
                refraction_index,
                color,
                author,
                description,
                reutilizable,
                public
            }
        });
        res.json(updatedMaterial);

    } catch (err) {

        res.json({ err: err.message })

    }
});

module.exports = route;