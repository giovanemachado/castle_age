'use server';
import { signIn } from "../../auth";

export async function authenticate(_: {}, formData: FormData) {
    try {
        const result: Response = await fetch(
            "http://localhost:3001/auth/login",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username: formData.get("username"),
                    password: formData.get("password"),
                }),
            }
        );

        return await result.json();
    } catch (error) {
        throw error;
    }
}

export async function signInAction(_: {}, formData: FormData) {
    return await signIn("credentials", formData);
}

export async function lg(user: string, pass: string) {
    const result: Response = await fetch("http://localhost:3001/auth/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
    });
    return await result.json();
}
