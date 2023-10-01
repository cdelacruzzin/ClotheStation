
const { ApolloServer } = require('apollo-server-express'); //Imports the Apollo Server to create GraphQL a server with Express
const express = require('express');
const path = require('path'); //imports the path module, which is a node.js module to work with directories and files
const db = require('./config/connection'); //imports the database connection string from the config file

const { authMiddleware } = require('./utils/auth');   //imports the authentication from the utility files
const { resolvers, typeDefs } = require('./schemas'); //imports the GraphQL resolver and type definition functions


//import stripe into server.js
const stripe = require('stripe')('sk_test_51NvpXcItNuwzBTMWuEw91tBIEQUQPac3ajfxnn2eHcbQFCf4UJrYqkveOQ5zi8fQ6p0ZAGQEMEb7DC8PkPZmz6jy00jQMmCkpn')

const app = express(); //creates an express server instance
const PORT = process.env.PORT || 3001; //stores the port number from the .env file. if dne, set the port as 3000

const server = new ApolloServer({   //initializes a new Apollo Server with the typeDefs, resolver functions and the auth context 
    typeDefs,
    resolvers,
    context: authMiddleware   //before a request is processed by resolvers, it wil pass through this middleware. it checks if the request has a valid jwt, if so, attach it to the request's context.
})


app.use(express.urlencoded({ extended: true }));  //middleware to parse incoming url-encoded data(form submissions)
app.use(express.json());  //middleware to parse incoming JSON data (API requests)
app.use(express.static("public"));//required for stripe

const FRONTEND_DOMAIN = 'http://localhost:3001';
//cors are important for financial related things
//know that the api requests are coming from the store u want it to come from
//I believe this version of express doesn't use cors? Remember it being an import for express 4
var corsOptions = {
  origin:FRONTEND_DOMAIN, //http://localhost:3001
  credentials: true
}

//app.use(cors(corsOptions))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));   //serves static files from the "build" directory inside the cliend folder
}

app.get('/', (req, res) => {  //defines a router for the "/" endpoint
    res.sendFile(path.join(__dirname, '../client/build/index.html'));   //acts as an entry point. Once hit, send back the "index.html" from the build directopry
});

//creates a new instance of the Apollo Server with the graphql schema
const startApolloServer = async () => { //async function to start the Apollo server and apply its middlewares
    await server.start();   //starts the Apollo Server
    server.applyMiddleware({ app });  // apply the apollo server middlewares to the express app
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  }
  
  startApolloServer();