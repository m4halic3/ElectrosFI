const express = require('express');
const route = express.Router();

route.get('/', (req, res)=>{
    res.json('You wont get all the users');
});


route.post('/', (req, res)=>{
    res.json('You wont create a user');
});


route.post('/:idUser', (req, res)=>{
    res.json('You wont search a one user');
});

route.delete('/:idUser', (req, res)=>{
    res.json('You wont delete a one user');
});


route.patch('/:idUser', (req, res)=>{
    res.json('You wont update a one user');
});

module.exports = route;