const swaggerConfig = require('./swagger_doc')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {app, express} = require('./endpoints')

const port = 8080

const specs = swaggerJsDoc(swaggerConfig);

console.log('Detected routes:', Object.keys(specs.paths));

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json());


app.listen(port, "0.0.0.0", () => {
    console.log(`Starting app on 127.0.0.1:${port}`)
})