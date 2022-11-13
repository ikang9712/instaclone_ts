import {gql} from "apollo-server"
export default gql`
    type User{
        # required
        id: String!
        firstName: String!
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        # optional
        lastName: String
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        # computed fields 
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    }
`