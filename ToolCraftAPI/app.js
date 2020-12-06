// Modules Dependencies
const _express = require('express');
const _mongo = require('./Config/db');

// Router Modules
const _itemsRoute = require('./App/Routes/ItemsRoute');

// App Constants
const port = 8000;
const app = _express();

_mongo;

app.use('/api/item', _itemsRoute);

app.listen(port, _ => {
    console.log(`Server started on at http://localhost:${port}`);
})