const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const users = [ // Заглушка для БД
    {id: 1, username: 'admin', hashed_password: '$2b$10$nq0TTAH4ZUN/1lQq0tYcxe0H21Ra/IdM1T68IpgPYhLbNk9rxxZrm', role: 'admin', email: "admin@mail.ru"},
];

class UserAuthentication {
    static async hashedPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    static async isPasswordValid(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static getUser(username) {
        return users.find(user => user.username === username);
    }
};

class JWTMiddleware {
    static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token){
            return res.status(401).json({error: "No token found"});
        }
        jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
            if (err) {
                res.status(403).json({ error: "Invalid token"});
            };
            req.user = decodedUser;
            next();
        });
    }
}

module.exports = {
    UserAuthentication,
    JWTMiddleware,
    SECRET_KEY,
    jwt
};