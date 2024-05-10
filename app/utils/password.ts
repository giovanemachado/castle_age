export const saltAndHashPassword = (password: string) => {
    const saltRounds = 10;
    const bcrypt = require("bcrypt");
    return bcrypt.hashSync(password, saltRounds);
};
