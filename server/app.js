
//declaration to import Express server using Node.js syntax keyword require
const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose');

// create the Express Server instance for our app
const app = express();

//Connection to Database
mongoose.connect('mongodb+srv://tom:test123@qgl-ninja.yffq5.mongodb.net/qgl-ninja?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
})

// this is setting up the graphql endpoint on Express. This will fire everytime a request to Graphql is made.
app.use('/graphql', graphqlHTTP({
    //pass in schema for the middleware
    
    //schema: schema both are the same so we can use. This defines the graph
    schema,
    //set Graphiql to true.
    graphiql: true
}));

// Create a listener on localhost port 4000 logging a callback function to the console on success. Type npde app in the terminal to run the app.
app.listen(4000, () => {
    console.log('Now listening for requests on Port 4000')
});

