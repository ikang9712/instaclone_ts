import client from "../../client";
import { protectedResolver} from "../users.utils";

export default {
    Mutation: {
        followUser: protectedResolver(
            async(_, {username}, {loggedInUser}) => {
                const check = await client.user.findUnique({
                    where: {username},
                    select: {id: true}
                });
                await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        following: {
                            connect: {
                                username: username,
                            }
                        }
                    }
                })
                return {
                    ok: true,
                }
            }
        )
    }
}