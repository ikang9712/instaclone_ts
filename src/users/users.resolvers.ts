import client from "../client";

export default {
    User: {
        totalFollowing: async ({id}) => {
            return await client.user.count({where:{
                    followers: {
                        some: { id }
                    }}})
        },
        totalFollowers: async ({id}) => {
            return await client.user.count({where:{
                following: {
                    some: { id }
                }}})
        },
        isMe: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({id}, _, {loggedInUser})=> {
            if (!loggedInUser) {
                return false;
            }
            const exist = await client.user.count({where:{
                username: loggedInUser.username,
                following: {
                    some: {
                        id
                    }
                }
            }})
            return Boolean(exist)
        }
    }
}