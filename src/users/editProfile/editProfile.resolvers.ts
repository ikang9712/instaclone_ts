import * as bcrypt from "bcrypt"
import { Resolvers } from "../../types"
import { protectedResolver} from "../users.utils"

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver(async(_, 
                {firstName, lastName, username, email, password:newPassword}, 
                {client, loggedInUser}) => {
                
                if (newPassword=""){
                    return {
                        ok: false,
                        error: "Please enter valid password for new password."
                    }
                }
                const uglyPassword = await bcrypt.hash(newPassword, 10)
                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    // undefined values are not sent to DB.
                    data: {
                        firstName, 
                        lastName, 
                        username, 
                        email, 
                        ...(uglyPassword && {password: uglyPassword}), // condition && value (es6 syntax)
                    }
                })
                if (updatedUser.id){
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        error: "Cannot update the profile."
                    }
                }
            }
        )
    }
}

export default resolvers;