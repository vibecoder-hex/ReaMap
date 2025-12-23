const express = require('express');
const { JWTMiddleware, UserAuthentication, SECRET_KEY, jwt } = require('./auth');

const app = express()

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Hello World
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/api/', (req, res) => {
    res.json({"message": "Hello World"})
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Аутентификация пользователя
 *     description: Получение JWT токена по учетным данным
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен
 *       401:
 *         description: Неверные учетные данные
 *       403:
 *         description: Неверный пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */
app.post('/api/login/', async (req , res) => {
    try {
        const {username, password} = req.body;
        const user = UserAuthentication.getUser(username);
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        if (await UserAuthentication.isPasswordValid(password, user.hashed_password)) {
            const token = jwt.sign(
                { userId: user.id },
                SECRET_KEY,
                {expiresIn: '1h'}
            );
            res.json({token});
        }
        else {
            res.status(403).json({message: "Invalid credentials"});
        }
    }catch (e) {
        console.error('Login error:', e);
        return res.status(500).json({message: "Internal server error"});
    }

});

module.exports = { app, express };