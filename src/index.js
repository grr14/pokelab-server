require("dotenv").config()

const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const pokemonDB = require("./datasources/pokemonDB")

const { createStore } = require("./utils")
const store = createStore()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  dataSources: () => ({
    pokemonDB: new pokemonDB({ store }),
  }),
})

// The `listen` method launches a web server.
server
  .listen({ port: process.env.APOLLO_SERVER_PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
