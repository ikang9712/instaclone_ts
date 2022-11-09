import { Resolvers } from "../../types"
import { protectedResolver} from "../users.utils"
const resolvers: Resolvers = {
    Query: {
        seeProfile : protectedResolver(
            (_, {username}, {client}) => {
                const user = client.user.findUnique({
                    where: {
                        username, 
                    }
                })
                if (!user){
                    return {
                        ok: false,
                        error: "User cannot be found."
                    }
                }
                return {
                    ok: true
                }
            }
        )
    },
};

export default resolvers;