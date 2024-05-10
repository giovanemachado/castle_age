import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./app/utils/password";
import { fuck } from "./app/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("authorize");
                if (!credentials) {
                    throw "No credentials";
                }

                let user = null;

                // logic to salt and hash password
                const pwHash = saltAndHashPassword(credentials.password);
                console.log("nova senha => ", pwHash, " <=");

                // logic to verify if user exists
                // user = await getUserFromDb(credentials.username, pwHash);
                const d = fuck(credentials.username, pwHash);

               
                console.log(d);
                user = d;

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.");
                }

                // return user object with the their profile data
                return user;
            },
        }),
    ],
});
