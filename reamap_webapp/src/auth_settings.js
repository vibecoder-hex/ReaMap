const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('./db');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

class UserAuthentication {
    
    static async isPasswordValid(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async getUser(username) {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })
        return user;
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