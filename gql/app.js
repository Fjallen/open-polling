const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

const authUrl = "http://auth:9000"; //url for auth services


const typeDefs = gql`
    type User {
        email: String!
        password: String!
    }
    type Query {
        users: [User]
    }
`

const resolvers = {
    Query: {
        users: () =>{
            return fetch(`${authUrl}/users`)
            .then(res=>res.json())
        }
    }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({url})=>{
    console.log(`GQL live at ${url}`)
})