module.exports = (
        message,
        err,
        data = null
    ) => {
        return {
            message: message,
            error: err,
            data: data
    }
}