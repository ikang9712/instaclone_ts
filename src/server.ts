require('dotenv').config();
import { ApolloServer } from "apollo-server-express";
import * as logger from "morgan";
import * as express from "express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils"


const PORT = process.env.PORT;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req }) => {
            return {
                loggedInUser : await getUser(req.headers.token),
            }
        },
    });
    
    await server.start();
    const app = express();
    
    app.use(logger("tiny"))
    app.use("/static", express.static("uploads"))
    server.applyMiddleware({ app });

    app.listen({port: PORT}, () => {
        console.log(`🚀server is running on http://localhost:${PORT}`)
    });

}
startServer();