module.exports = item => {
    if (Object.entries(item).length === 0) {
        return null;
    }

    return {
        id: item.id,
        name: item.name,
        pluralName: item.pluralName,
        dismantledItems: item.dismantledItems ? item.dismantledItems : null
    }
}