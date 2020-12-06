// Database Access

// Dependencies
const _mongoose = require('mongoose');

// Models
const TCError = require('../Models/Constants/TCError');
const ItemReponse = require('../Models/Responses/ItemResponse');
const ItemDTO = require('../Models/DTOs/ItemDTO');
const ErrorMessage = require('../Models/Constants/ErrorMessages');

// Mock DB Items
const items = [
    ItemReponse({id: 000, name: 'Stick', pluralName: 'Sticks'}),
    ItemReponse({id: 001, name: 'Stone', pluralName: 'Stones'}),
    ItemReponse({id: 002, name: 'Axe', pluralName: 'Axes'})];

const find = index => {
    return items[index];
}

// Repo Methods
exports.GetInitialItems = () => {
    let stick = ItemDTO({...find(0)});
    stick.quantity = 1;

    let stone = ItemDTO({...find(1)});
    stone.quantity = 1;
    console.log([stick, stone]);
    return {
        data: [stick, stone],
        status: 200
    };
}

exports.GetItemSingle = (itemId) => {
    let tempItem;

    try {
        tempItem = ItemDTO({...find(itemId)});
        // console.debug(tempItem);
        
        if (!tempItem)
            throw ErrorMessage.ItemIdOutOfRange;

        tempItem.quantity = 1;
    }
    catch (err) {
        return {
            data: {error: TCError(ErrorMessage.ItemDoesNotExist, err)},
            status: 400
        }
    }

    return {
        data: tempItem,
        status: 200
    };
}

exports.GetItemMany = (itemId, quantity) => {
    let tempItem;

    try {
        tempItem = ItemDTO({...find(itemId)});
        // console.debug(tempItem);
        
        if (!tempItem)
            throw ErrorMessage.ItemIdOutOfRange;

        tempItem.quantity = quantity;
    }
    catch (err) {
        return {
            data: {error: TCError(ErrorMessage.ItemDoesNotExist, err)},
            status: 400
        }
    }

    return {
        data: tempItem,
        status: 200
    };
}