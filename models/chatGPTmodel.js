
'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var chatGPTSchema = Schema( {
    date:Date,
    question:String,
    answer:String,
});

module.exports = mongoose.model( 'chatGPTResponse', chatGPTSchema);