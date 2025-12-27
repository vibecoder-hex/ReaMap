const express = require('express');
const { JWTMiddleware, UserAuthentication, SECRET_KEY, jwt } = require('./auth_settings');

const router = express.Router();


/**
 * @swagger
 * /api/users/login:
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
router.post('/login', async (req , res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "Username and password are required"});
        }
        const user = await UserAuthentication.getUser(username);
        if (!user) {
            return res.status(403).json({error: "Invalid credentials"});
        }
            const token = jwt.sign(
                { userId: user.id },
                SECRET_KEY,
                {expiresIn: '1h'}
            );
            res.json({token});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }

});

module.exports = router;