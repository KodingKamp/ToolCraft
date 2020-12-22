/**
 * Business Logic
 */ 

// Dependencies
const _itemRepo = require('../Repositories/ItemsRepo');

// Models
const ItemRequest = require('../Models/Requests/ItemRequest');
const ItemsDTO = require('../Models/DTOs/ItemsDTO');
const ItemDTO = require('../Models/DTOs/ItemDTO');
const TCError = require('../Models/Responses/TCError');
const ErrorMessage = require('../Models/Constants/ErrorMessages');

exports.GetInitialItems = async (req, res) => {
    let responseObject = await _itemRepo.GetInitialItems();

    await res.status(responseObject.status).send(responseObject.data);
}

exports.GetItem = async (req, res) => {
    try {
        let request = ItemRequest(req.params);

        if (Object.entries(request).length === 0)
            throw ErrorMessage.ParsingError;
        else if (isNaN(request.id))
            throw ErrorMessage.ParsingDataToIntError(req.params.id);
        else if (request.quantity && isNaN(request.quantity))
            throw ErrorMessage.ParsingDataToIntError(req.params.quantity);
        // Extra check for quantity equals 0 because 0 is falsy 
        else if (request.quantity && request.quantity < 1)
            throw ErrorMessage.ItemQuantityNotPossitiveNumber;

        let responseObject = await _itemRepo.GetItem(request.id);

        if (!responseObject)
            throw ErrorMessage.ItemDoesNotExist;

        responseObject.data.quantity = request.quantity ? request.quantity : 1;

        await res.status(responseObject.status).json(ItemDTO(responseObject.data));
    }
    catch (err) {
        await res.status(400).send({
            error: TCError(ErrorMessage.InvalidParameters, err)
        });
        return;
    }
}

exports.DismantleItem = async (req, res) => {
    try {
        let itemId = ItemRequest(req.params).id;

        let responseObject = await _itemRepo.DismantleItem(itemId);

        if (!responseObject)
            throw ErrorMessage.ItemDoesNotExisst;

        let tempItems = [];

        for (let item of responseObject.data.dismantlesTo) {
            let tempItemResponse = await _itemRepo.GetItem(item.id, item.quantity)

            if (!tempItemResponse)
                throw ErrorMessage.ItemDoesNotExist;

            tempItemResponse.data.quantity = item.quantity;

            tempItems.push(tempItemResponse.data);
        }

        await res.status(200).send(ItemsDTO(tempItems)); 
    } catch (err) {
        res.status(500).send({
            error: TCError(ErrorMessage.ItemDismantleError, err)
        })
    }
}