const config = require('config/secret.json');
const jwt = require('jsonwebtoken');
// const Role = require('_helpers/role');
const { User } = require('app/models');


module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ name, password }) {
    const user = await User.findOne({where: {name: name, password: password}})
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            user,
            token
        };
    }
}

async function getAll() {
    const users = await User.findAll()
    return users;
    // return users.map(u => {
    //     const { password, ...userWithoutPassword } = u;
    //     return userWithoutPassword;
    // });
}

async function getById(id) {
    const user = await User.findByPk(id);
    if (!user) return;
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword;
    return user;
}
