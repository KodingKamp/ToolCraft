const express = require("express");

const app = express();
const port = 8000;

// Controller Modules
const _itemsController = require('./App/Controllers/ItemsController');

app.get('/item', _itemsController.get_item);

app.listen(port, _ => {
    console.log(`Server started on port ${port}`);
})