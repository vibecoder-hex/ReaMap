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

class UserRegistration {
    static checkPasswordLength(password) {
        if (password.length < 8) {
            return false;
        }
        return true;
    }

    static comparePasswords(password, confirmPassword) {
        if (password !== confirmPassword) {
            return false;
        }
        return true;
    }

    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    static async createUser(req) {
        const { username,
            password,
            email,
            role,
            fullname,
            groupId,
            studentCardNumber,
            department,
            academicDegree
            } = req.body;
        
        const hashedPassword = await this.hashPassword(password);

        const createData = {
                username: username,
                passwordHash: hashedPassword,
                email: email,
                role: role,
                fullName: fullname
        };
        if (createData.role === "student") {
            createData.student = {
                create: {
                    groupId: parseInt(groupId),
                    studentCardNumber: studentCardNumber,
                }
            };
        }
        if (createData.role === "teacher") {
            createData.teacher = {
                create: {
                    department: department, 
                    academicDegree: academicDegree
                }
            };
        }
        const user = await prisma.user.create({data: createData});
    };
}

module.exports = {
    UserAuthentication,
    JWTMiddleware,
    UserRegistration,
    SECRET_KEY,
    jwt
};