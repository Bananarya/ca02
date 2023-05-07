'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var GPTSchema = Schema( {
  date: Date,
  Question: String,
  Response: String,
});

module.exports = mongoose.model( 'GPTresponse', GPTSchema);