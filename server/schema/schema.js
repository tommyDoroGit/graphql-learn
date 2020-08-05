//Pull in the GraphQL
const graphql = require("graphql");

//Load Lodash via NPM to leverage its power
const _ = require("lodash");

//Pull in the GraphQL Object Type Variables , and the GraphQl datatypes
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

var authors = [
    {name: 'Tom D', age: 44, id: '1'},
    {name: 'Kate D', age: 32, id: '2'},
    {name: 'Issac Hayes', age: 30, id: '3'}
];

//Define the BookType instance of the new GraphQLObject Class. 
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//Define the BookType instance of the new GraphQLObject Class. 
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

//Define the Root Query entry point. This matches out BookType instance as specified in type. Then, its args are the arguments we can use in the query.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
        type: AuthorType,
        agrs: {id: {type: GraphQLID} },
        resolve(parent, args) {
           // code to get data from db / other source
        return _.find(authors, { id: args.id }); 
        }
    }
  },
});


//Export the schema from import on the app. This method is the Node.js version
module.exports = new GraphQLSchema({
  query: RootQuery,
});