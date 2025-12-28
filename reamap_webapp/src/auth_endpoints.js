const express = require('express');
const { UserAuthentication, UserRegistration, SECRET_KEY, jwt } = require('./auth_settings');

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
        if (!await UserAuthentication.checkPassword(password, user.passwordHash)) {
            const token = jwt.sign(
                { userId: user.id },
                SECRET_KEY,
                {expiresIn: '1h'}
            );
            return res.json({token});
        } else {
            return res.status(403).json({error: "Invalid credentials"});
        }
        
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создание учетной записи пользователя с указанными данными
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
 *               - repeatPassword
 *               - email
 *               - role
 *               - fullname
 *             properties:
 *               username:
 *                 type: string
 *                 description: Уникальное имя пользователя
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя
 *                 minLength: 6
 *                 example: "securePass123"
 *               repeatPassword:
 *                 type: string
 *                 format: password
 *                 description: Подтверждение пароля
 *                 example: "securePass123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта пользователя
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 description: Роль пользователя в системе
 *                 enum:
 *                   - user
 *                   - admin
 *                   - moderator
 *                 example: "user"
 *               fullname:
 *                 type: string
 *                 description: Полное имя пользователя
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "John Doe"
 *             example:
 *               username: "john_doe"
 *               password: "securePass123"
 *               repeatPassword: "securePass123"
 *               email: "john.doe@example.com"
 *               role: "user"
 *               fullname: "John Doe"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь успешно зарегистрирован"
 *                 userId:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *       400:
 *         description: Ошибка валидации или некорректные данные
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пароли не совпадают"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 *       409:
 *         description: Конфликт данных (пользователь или email уже существует)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь с таким именем уже существует"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при регистрации пользователя"
 */
router.post('/register', async (req, res) => {
        const { username,
            password,
            repeatPassword,
            email,
            role,
            fullname
            } = req.body;
        if (! username || !password || !repeatPassword || !email || !role || !fullname) {
            res.status(400).json({
                error: "All fields are required"
            });
        }
        if (!UserRegistration.checkPasswordLength(password)) {
            res.status(400).json({
                error: "Password must be at least 8 characters long"
            });
        }
        if (!UserRegistration.comparePasswords(password, repeatPassword)) {
            res.status(400).json({
                error: "Passwords do not match"
            });
        }

        const user = await UserRegistration.createUser(req);

        return res.status(201).json({result: "Пользователь зарегистрирован", username: user.username});

});

module.exports = router;