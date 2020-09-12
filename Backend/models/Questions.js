var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Questions = new Schema({
    query:{
        type:String
    },
    topic:{
        type:String
    },
    tags:{
        type:String
    }
});

Questions.index({tags:'text'});

module.exports = mongoose.model('Questions',Questions);