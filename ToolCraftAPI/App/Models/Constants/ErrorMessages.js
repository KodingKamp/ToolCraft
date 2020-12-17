// General
exports.ParsingError = 'Error parsing parameters.';
exports.InvalidParameters = 'Invalid parameters.';
exports.ParsingDataToIntError = o => `Parsing Error: Cannot parse ${typeof(o)} into an Int.`;

// Database
exports.MongoConnectionAttempt = 'A error occured while attempting to connect to Mongo';

// Item
exports.ItemQuantityNotPossitiveNumber = 'Quantity must be a positive number.';
exports.ItemIdOutOfRange = 'Item ID out of range.';
exports.ItemDoesNotExist = 'Item does not exist.';
exports.ItemDismantleError =  'There was an error while attempting to dismantle the item.';