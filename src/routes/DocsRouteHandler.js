const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Issue Tracker - track issues!',
            version: '1.0.0',
            description:
                'A project designed for tracking your issues :)',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/'
            },
            contact: {
                name: 'Swagger',
                url: 'https://swagger.io',
                email: 'Info@SmartBear.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: [
        './src/models/Issue.js',
        './src/models/Error.js',
        './src/routes/IssuesRouteHandler.js'
    ]
};

class DocsRouteHandler {
    constructor(app) {
        this.app = app;
        this.route = '/docs';

        this.setup();
    }

    setup() {
        this.app.use(this.route, swaggerUi.serve);
        this.app.get(this.route, swaggerUi.setup(swaggerJsdoc(options), {
            explorer: true
        }));
    }
}

module.exports = DocsRouteHandler;