module.exports = item => {
    if (!item) {
        return null;
    }

    return {
        id: item.id,
        name: item.name,
        pluralName: item.pluralName
    }
}