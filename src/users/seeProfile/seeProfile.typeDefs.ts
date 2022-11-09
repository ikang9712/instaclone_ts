import {gql} from "apollo-server"
export default gql`
    type seeProfileResult {
        ok: Boolean!
        error: String
    }
    type Query {
        seeProfile(username:String!): seeProfileResult!
    }
`