import {createWriteStream} from "fs"
import client from "../../client"
import * as bcrypt from "bcrypt"
import {protectedResolver} from "../users.utils"

export default {
    Mutation: {
        editProfile: protectedResolver(
            async(
                _, 
                {firstName, lastName, username, email, password:newPassword, bio, avatar},
                {loggedInUser}
                ) => {
                let avatarUrl = null;
                if (avatar){
                    const {filename, createReadStream } = await avatar;
                    const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`
                    const readStream = createReadStream()
                    const writeStream = createWriteStream(process.cwd()+"/uploads/" + newFileName)
                    readStream.pipe(writeStream)
                    avatarUrl = `http://localhost:4000/static/${newFileName}`
                }
                
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
                        bio,
                        ...(uglyPassword && {password: uglyPassword}), // condition && value (es6 syntax)
                        ...(avatarUrl && {avatar: avatarUrl})
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