export const saltAndHashPassword = (password: string) => {
    const saltRounds = 10;
    const bcrypt = require("bcryptjs");
    return bcrypt.hashSync(password, saltRounds);
};
