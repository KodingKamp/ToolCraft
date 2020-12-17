// Database Access

// Dependencies
const _mongoose = require('mongoose');

// Models
const TCError = require('../Models/Constants/TCError');
const ItemReponse = require('../Models/Responses/ItemResponse');
const ItemDTO = require('../Models/DTOs/ItemDTO');
const ErrorMessage = require('../Models/Constants/ErrorMessages');
const Messaging = require('../Models/Constants/Messaging');
const DBItem = require('../Models/Constants/DB_Item');
const ItemsDTO = require('../Models/DTOs/ItemsDTO');

// Mock DB Items
const items = [
    ItemReponse({id: 000, name: 'Stick', pluralName: 'Sticks'}),
    ItemReponse({id: 001, name: 'Stone', pluralName: 'Stones'}),
    ItemReponse({
        id: 002, 
        name: 'Axe', 
        pluralName: 'Axes',
        dismantledItems: [
            {
                id: 000,
                quantity: 1
            },
            {
                id: 001,
                quantity: 1
            }
        ]
    })
];

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
        tempItem = {...find(itemId)};
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
        data: ItemDTO(tempItem),
        status: 200
    };
}

exports.GetItemMany = (itemId, quantity) => {
    let tempItem;

    try {
        tempItem = {...find(itemId)};
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
        data: ItemDTO(tempItem),
        status: 200
    };
}

exports.DismantleItem = (itemId) => {
    let item = {...find(itemId)};
    
    if (Object.entries(item).length === 0)
        throw ErrorMessage.ItemIdOutOfRange;

    console.log(item);

    if(!item.dismantledItems) {
        return {
            data: {error: TCError(Messaging.ItemCannotBeDismantled)},
            status: 400
        }
    }

    let tempItems = [];

    for(let i of item.dismantledItems) {
        let tempItem = ItemDTO({...find(i.id)});
        tempItem.quantity = 1;
        tempItems.push(tempItem);
    }

    return {
        data: ItemsDTO(tempItems),
        status: 200
    }
}