export async function authenticate(prevState: {}, formData: FormData) {
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
