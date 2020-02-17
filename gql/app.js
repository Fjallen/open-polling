const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

const authUrl = "http://auth:9000"; //url for auth services
const pollUrl = "http://poll:3002" //url for poll services

const typeDefs = gql`
    type User {
        email: String!
        password: String!
    }
    type Poll {
        pollId: String!,
        title: String!,
        userId: String!,
        responses: [Response],
        selections: [Selection]
    }
    type Selection {
        selectNum: Int!,
        selectString: String!
    }
    type Response {
        ip: String!,
        selection: Int!,
        responseTime: String!
    }
    type Query {
        users: [User],
        polls: [Poll],
        poll(id: Int!): Poll
    }
`

const resolvers = {
    Query: {
        users: () =>{
            return fetch(`${authUrl}/users`)
            .then(res=>res.json())
        },
        polls:()=>{
            return fetch(`${pollUrl}/poll/all`)
            .then(res=>res.json())
        },
        poll: (_,{id})=>{
            return fetch(`${pollUrl}/poll/${id}`)
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