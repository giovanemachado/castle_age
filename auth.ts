import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { lg } from "./app/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials: any) => {
                if (!credentials) {
                    throw "No credentials";
                }

                const loginResult = await lg(
                    credentials.username,
                    credentials.password,
                );

                if (!loginResult.access_token) {
                    throw new Error("User not found.");
                }

                return loginResult;
            },
        }),
    ],
});
