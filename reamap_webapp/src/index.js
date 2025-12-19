const express = require('express');
const swaggerConfig = require('./swagger_doc')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()
const port = 8080

const specs = swaggerJsDoc(swaggerConfig);

console.log('Detected routes:', Object.keys(specs.paths));

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs))

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
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Starting app on 127.0.0.1:${port}`)
})