import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadTypes);
export const resolvers = mergeResolvers(loadedResolvers);

// const schema = makeExecutableSchema({typeDefs, resolvers});
// export default schema;