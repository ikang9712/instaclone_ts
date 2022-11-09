import client from "../../client"
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createAccount: async(_, 
            {firstName,lastName,username,email,password}
            ) => {
                try {
                    // 1.check if username or email are already on DB.
                    const existingUser = await client.user.findFirst({
                        where: {
                            OR: [
                                {
                                    username,
                                },
                                {
                                    email,
                                }
                            ]
                        }
                    })
                    // ERR: user exists.
                    if (existingUser){
                        return {
                            ok: false,
                            error: "This username/email is already taken."
                        }
                    }
                    // 2.hash password
                    // hashing salt, pepper & rainbow table
                    const uglyPassword = await bcrypt.hash(password, 10)
                    // 3.save and return the user
                    // waiting property of browser, so automatically async
                    await client.user.create({
                        data: {
                            username,
                            email,
                            firstName,
                            lastName,
                            password: uglyPassword
                    }})
                    return {
                        ok: true
                    }   
                } catch (error) {
                    return {
                        ok: false,
                        error
                    }
                }
        }
    }
}