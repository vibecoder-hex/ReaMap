module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rea Map',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [`${__dirname}/auth_endpoints.js`]
};
