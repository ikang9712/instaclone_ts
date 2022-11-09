import client from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {protectedResolver} from "../users.utils"

export default {
    Mutation: {
        editProfile: protectedResolver(
            async(
                _, 
                {firstName, lastName, username, email, password:newPassword},
                {loggedInUser}
                ) => {
                let uglyPassword = null;
                if (newPassword){
                    uglyPassword = await bcrypt.hash(newPassword, 10)
                }
    
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