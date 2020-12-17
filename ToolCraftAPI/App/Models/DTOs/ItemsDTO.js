module.exports = items => {
    if (Object.entries(items).length === 0) {
        return null;
    }

    let listOfItems = [];

    for(let item of items) {
        let tempItem = {
            id: item.id,
            name: item.name,
            pluralName: item.pluralName,
            quantity: item.quantity
        }
        listOfItems.push(tempItem);
    }

    return listOfItems;
}