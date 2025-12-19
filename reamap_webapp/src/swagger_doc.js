module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rea Map',
            version: '1.0.0',
        },
    },
    apis: [`${__dirname}/index.js`]
};
