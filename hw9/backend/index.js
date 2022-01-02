import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './src/mongo'
import db from './src/db'
import User from './src/resolvers/User'
import Message from './src/resolvers/Message'
import ChatBox from './src/resolvers/ChatBox'
import Mutation from './src/resolvers/Mutation'
import Subscription from './src/resolvers/Subscription'
import Query from './src/resolvers/Query'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});

mongo();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});