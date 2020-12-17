/**
 * Database Aggregation
 */

// Dependencies
const _mongoose = require('mongoose');

// Models
const ItemRequest = require('../Models/Requests/ItemRequest');
const ItemReponse = require('../Models/Responses/ItemResponse');
const ItemDTO = require('../Models/DTOs/ItemDTO');
const Messaging = require('../Models/Constants/Messaging');
const ErrorMessage = require('../Models/Constants/ErrorMessages');

// Mock DB Items
let items = [
    ItemReponse({id: 000, name: 'Stick', pluralName: 'Sticks'}),
    ItemReponse({id: 001, name: 'Stone', pluralName: 'Stones'}),
    ItemReponse({
        id: 002, 
        name: 'Axe', 
        pluralName: 'Axes',
        dismantlesTo: [
            ItemRequest({
                id: 000,
                quantity: 1
            }),
            ItemRequest({
                id: 001,
                quantity: 1
            })
        ]
    })
];

const find = index => {
    return items[index];
}

// Repo Methods
exports.GetInitialItems = async () => {
    let stick = ItemDTO({...find(0)});
    stick.quantity = 1;

    let stone = ItemDTO({...find(1)});
    stone.quantity = 1;

    return {
        data: [stick, stone],
        status: 200
    };
}

exports.GetItem = async (itemId) => {
    let tempItem;

    tempItem = {...find(itemId)};
    
    if (Object.entries(tempItem).length === 0)
        throw ErrorMessage.ItemDoesNotExist;

    return {
        data: tempItem,
        status: 200
    };
}

exports.DismantleItem = async (itemId) => {
    let tempItem = {...find(itemId)};
    
    if (Object.entries(tempItem).length === 0)
        throw ErrorMessage.ItemIdOutOfRange;
    
    if(!tempItem.dismantlesTo) {
        throw Messaging.ItemCannotBeDismantled
    }

    return {
        data: tempItem,
        status: 200
    }
}