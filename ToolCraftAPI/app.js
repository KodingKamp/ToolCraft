// Modules Dependencies
const _express = require('express');
const _mongo = require('./Config/db');
const _cors = require('cors');

// Router Modules
const _itemsRoute = require('./App/Routes/ItemsRoute');

// App Constants
const port = 8000;
const app = _express();

_mongo;

app.use(_cors());
app.use(_express.json());
app.use('/api/item', _itemsRoute);

app.listen(port, _ => {
    console.log(`Server started on at http://localhost:${port}`);
})