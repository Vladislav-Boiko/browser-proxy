const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');

const startGraphQlServer = ({ port }) => {
  const schema = fs.readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf8',
  });
  const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });
  apolloServer.listen({ port }).then('Started graphQl Mock server');
};

module.exports = startGraphQlServer;
