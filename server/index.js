const express = require('express');
let globalRouter = require('routes');

const app = express();

app.use(express.json(), express.static());

app.use('/', globalRouter);

const port = 80;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});