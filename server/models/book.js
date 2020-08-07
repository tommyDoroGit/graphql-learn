const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define db schema. This should coorespond to the book schema we have created in graphQL. 
// No need to add Id as Mongo will create these by default
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

// We define the model (collection) called Book and will have objects based on our bookSchema
module.exports = mongoose.model("Book", bookSchema);

