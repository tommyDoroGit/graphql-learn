//Pull in the GraphQL
const graphql = require("graphql");

//Load Lodash via NPM to leverage its power
const _ = require("lodash");

//Import the DB Models
const Book = require('../models/book');
const Author = require('../models/author');

//Pull in the GraphQL Object Type Variables , and the GraphQl datatypes
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
  } = graphql;

// dummy data


//Define the BookType instance of the new GraphQLObject Class. 
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    id: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

//Define the BookType instance of the new GraphQLObject Class. 
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
      },
    },
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
        //return _.find(books, { id: args.id });
        //return Author.findById()
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors
      }
    }
  },
});

//Set the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },

      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save()
      }
    },

    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID}
      },

      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId 
        });
        return book.save();
      }
    }
  }
});


//Export the schema from import on the app. This method is the Node.js version
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});