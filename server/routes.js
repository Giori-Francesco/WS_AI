const express = require('express');

const globalRouter = express.Router();

const routerGA = express.Router();
const routerANN = express.Router();
const routerNE = express.Router();

globalRouter.use('/geneticAlgorithms', routerGA);
globalRouter.use('/neuralNetworks', routerANN);
globalRouter.use('/neuroEvolution', routerNE);

routerGA.get('/', (req, res) => {
    
});

module.exports = globalRouter;