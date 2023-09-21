
const { ApolloServer } = require('apollo-server-express'); //Imports the Apollo Server to create GraphQL a server with Express
const express = require('express');
const path = require('path'); //imports the path module, which is a node.js module to work with directories and files
const db = require('./config/connection'); //imports the database connection string from the config file

//import auth
const {resolvers, typeDefs} = require('./schemas'); //imports the GraphQL resolver and type definition functions

const app = express(); //creates an express server instance
const PORT = process.env.PORT || 3001; //stores the port number from the .env file. if dne, set the port as 3000
