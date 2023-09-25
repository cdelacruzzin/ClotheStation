import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {setContext} from '@apollo/client/link/context';     //utility from apollo client which lets modify the request context, when sending a request/ recieving a response.
//import necessary react and apollo packages\

//TODO: import modules for the main app



const httpLink = createHttpLink({
    uri: '/graphql',    // the uri specifies the graphql server's endpoint - in this case, "/graphql". when a "mutation" or "query" occurs, the request will be sent to '/graphql
});

// "setContext" modifies the context of the graphql request each time a request is made. 
// here, we attach the JWT as an "authorization" header to every request.
const authLink = setContext((_, {headers}) =>{
    //the token is retrieved from the local storage.
    // the JWT token will be stored in local storage if the user has already logged in, and if their session has not expired.
    //setting the JWT to local storage will be when the user logs in or signs up
    const token = localStorage.getItem('id_token');     

    return {
        //returns a modified headers. the returned headers is an new object containing a shallow copy of the headers object,
        // and modifies the "authorization" property to include the token if it exists. 
        // If token exists, add it to the headers, if not, add an empty string
        headers: {
            ...headers,
            authorization: token?  `Bearer ${token}` : '',
        },
    };
});


//initialize a new Apollo Client instance to interact with GraphQL
const client = ApolloClient({
    //authLink attaches the JWT token to every request in the headers. the JWT ensures whether the user is authorized or not.
    //httpLink sends requests to the graphql server
    //since we concat "httpLink" is concatenated after "authLink", authLink will be executed first, to attach JWT before each request
    link: authLink.concat(httpLink),
    cache: InMemoryCache(),
})

function App() {
    return(
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route></Route>
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App;