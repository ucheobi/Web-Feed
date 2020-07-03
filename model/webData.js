const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebSchema = new Schema({
  title: String,
  link: String,
  description: String,
  publishedDate: Date,
  entryDate: Date.now(),
  updatedAt: Date
});


module.exports = mongoose.model('WebFeed', WebSchema);
