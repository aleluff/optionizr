var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
    bid: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true },
    stock: { type: Number, min: 1000, max: 2000, required: true },
    sale: { type: Number, min: 0, required: true },
}, { collection: 'Properties' });

module.exports = mongoose.model('Properties', PropertySchema);