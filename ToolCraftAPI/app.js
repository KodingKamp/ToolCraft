const express = require("express");

const app = express();
const port = 8000;

/**
 * APIS
 */

 const ItemsController = require('./App/Controllers/ItemsController');

app.listen(port, _ => {
    console.log(`Server started on port ${port}`);
})