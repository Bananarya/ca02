
'use strict';
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var countrySchema = Schema( {
  date: Date,
  CountryName: String,
  capital: String,
  region: String,
  population: Number,
  maps:Object
});

module.exports = mongoose.model( 'countryResponse', countrySchema);