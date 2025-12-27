const swaggerConfig = require('./swagger_doc')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');

const app = express();

const usersRouter = require('./auth_endpoints');

const port = 8080

const specs = swaggerJsDoc(swaggerConfig);

console.log('Detected routes:', Object.keys(specs.paths));

app.use(express.json());
app.use(cors());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/users', usersRouter);


app.listen(port, "0.0.0.0", () => {
    console.log(`Starting app on 127.0.0.1:${port}`)
})