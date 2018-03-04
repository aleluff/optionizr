var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true, index: { unique: true } },
    age: { type: Number, min: 1900, max: 2900, required: true },
    pays: { type: String, required: true },
}, { collection: 'Users' });

module.exports = mongoose.model('Users', UserSchema);