import { PrismaClient, User} from "@prisma/client"

type Context = {
    loggedInUser: User; // optional? then need to handle if, else in resolver
    client: PrismaClient
}

export type Resolver = (
    root:any, 
    args:any, 
    context:Context, 
    info:any
) => any;

export type Resolvers = {
    // Mutation
    [key:string]: {
        [key:string]: Resolver
    }
}