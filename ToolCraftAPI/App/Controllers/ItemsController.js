// Business Logic

// Dependencies
const _itemRepo = require('../Repositories/ItemsRepo');

// Models
const TCError = require('../Models/Constants/TCError');
const ItemRequest = require('../Models/Requests/ItemRequest');
const ErrorMessage = require('../Models/Constants/ErrorMessages');

exports.GetInitialItems = (req, res) => {
    let responseObject = _itemRepo.GetInitialItems();

    res.status(responseObject.status).send(responseObject.data);
}

exports.GetItem = (req, res) => {
    let item;

    try {
        item = ItemRequest(req.params);
        // console.debug(item);

        if (Object.entries(item).length === 0)
            throw ErrorMessage.ParsingError;
        else if (isNaN(item.id))
            throw ErrorMessage.ParsingDataToIntError(req.params.id);
        else if (isNaN(item.quantity))
            throw ErrorMessage.ParsingDataToIntError(req.params.quantity);
        else if (item.quantity && item.quantity < 1 || item.quantity == 0)
            throw ErrorMessage.ItemQuantityNotPossitiveNumber;
    }
    catch (err) {
        res.status(400).send({
            error: TCError(ErrorMessage.InvalidParameters, err, item)
        });
        return;
    }
    
    let responseObject = (item.quantity)
                            ? _itemRepo.GetItemMany(item.id, item.quantity)
                            : _itemRepo.GetItemSingle(item.id);
    
    res.status(responseObject.status).send(responseObject.data);
}