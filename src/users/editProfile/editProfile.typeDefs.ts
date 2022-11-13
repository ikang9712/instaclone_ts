import {gql} from "apollo-server"
import Upload from 'graphql-upload/Upload';

export default gql`
    scalar Upload
    type editProfileResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editProfile(
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
            bio: String
            avatar: Upload
        ): editProfileResult!
    }
`