# grahql-learn
Beginner App and documentation for graphQL

## Project Stack
Express.js
MongoDB
Apollo
React

### Notes
Nodemon has been install to watch for changes in the application so the app server doesn't need to be restarted every time a change has been made.

### Express
To setup the express server, create a server folder in the application and a file app.js. Within that file import expresss, create the server instance the listener method.

### GraphQL
Npm install GraphQL to the project. Also npm install graphql-express to enable express server to implement graphql on the server
In app.js - const graphqlHTTP = require('express graphql');

### Schema
create Schema folder and schema.js file within the server folder. 
Create Object Types

### Root Query
How we describe where a user can jump in to the graph

### Graphical
Documentation Explorer displays the schema. Use this to base your queries. e.g book(args = id:string).
Full Example - 

*Arguments must be in double quotes
{
  book(id:"1"){
    name
    genre
    id
  }
}

Up to episode 13


