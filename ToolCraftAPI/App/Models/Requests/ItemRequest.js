module.exports = (params) => {
    if (!params) {
        return null;
    }

    return {
        id: parseInt(params.id),
        quantity: (params.quantity !== undefined)
            ? parseInt(params.quantity)
            : null
    }
}