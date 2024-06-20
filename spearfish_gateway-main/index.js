"use strict"

require('dotenv').config()
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { json } = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const schema = require('./graphql');
const cors = require('cors');
const { authMiddleware } = require('./midddlewares');
const { Connection } = require('./db');

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    schema,
    // introspection: true,
    cors: {
        "origin": "https://studio.apollographql.com",
        "credentials": true
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const whitelist = [
    process.env.SITE_URL,
    "http://192.168.1.73:3000",
    "https://studio.apollographql.com",
    "https://www.spearfishke.com",
    "https://spearfishke.com",
    "http://31.220.17.75:3000",
    "https://31.220.17.75:3000"
];

const corsOptions = {
    origin: whitelist,
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};


(async () => {
    app.enable('trust proxy');
    app.use(helmet());
    // CORS
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(limiter);
    app.use(json());

    // Setup server
    await server.start();
    app.use(
        '/graphql',
        expressMiddleware(server, { context: async ({ req }) => (authMiddleware(req)) })
    );

    await new Promise((resolve) => resolve(httpServer.listen(process.env.PORT || 4000)));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}/graphql`);

    // Handle DB connection
    const DBConn = new Connection();
    DBConn.handleCallBacks();
    await DBConn.setUpDefaultCategories();
})();
