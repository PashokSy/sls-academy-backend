const mongoose = require('mongoose');

const urlScheme = new mongoose.Schema({
  longUrl: {
    type: String,
    required: [true, 'Url must be provided'],
  },
  shortUrlAlias: {
    type: String,
    required: [true, 'Short ulr alias must be provided'],
  },
  aliasProvided: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model('Urls', urlScheme);
