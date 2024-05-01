require('dotenv').config();
//express
const express = require('express');
const app = express();
//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//mongodb
const mongoose = require('mongoose');
const MongoDB = process.env.MONGODB
//graphql
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//post image
const router = require('./routes/admin');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const cors = require('cors');
app.use(cors());

app.use(router)
app.use("/uploads",express.static('uploads'))

async function startServer() {
    await server.start(); 
    server.applyMiddleware({ app }); 
    mongoose.connect(MongoDB, { useNewUrlParser: true})
        .then(() => {
            console.log('Connected');
            return app.listen({ port: 8080 }, () => {
                console.log("http://localhost:8080"+server.graphqlPath);
            });
        })
        .catch((err) => {
            console.log('error', 'Error:', err);
        });
}

startServer();