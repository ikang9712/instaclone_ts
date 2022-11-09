import {gql} from "apollo-server"

export default gql`
    type LoginResult {
        ok: Boolean!
        token: String #optional
        error: String
    }
    type Mutation {
        login(username:String!, password:String!): LoginResult!
    }
`