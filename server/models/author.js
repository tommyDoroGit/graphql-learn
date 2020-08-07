const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define db schema. This should coorespond to the author schema we have created in graphQL.
// No need to add Id as Mongo will create these by default
const authorSchema = new Schema({
  name: String,
  age: Number
});

// We define the model (collection) called  and will have objects based on our authorSchema
module.exports = mongoose.model("Author", authorSchema);
