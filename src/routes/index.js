const IssuesRouteHandler = require('./IssuesRouteHandler.js');
const DocsRouteHandler = require('./DocsRouteHandler.js');
const { setupControllers } = require('../controllers');
const config = require('../config.js');
const DatabaseProvider = require('../providers/DatabaseProvider.js');

const handlers = [
    IssuesRouteHandler,
    DocsRouteHandler
];

const setupRoutes = app => {
    const dbProvider = new DatabaseProvider(config.databaseSettings);
    const controllers = setupControllers(dbProvider);

    for (let handler of handlers) {
        let handlerInstance = new handler(app, dbProvider, controllers);
        console.info(`Route handler configured for path ${handlerInstance.route}`);
    }

    // 404 handler
    app.get('*', (req, res) => res.status(404).send({ error: 'Not Found' }));
};

module.exports = {
    setupRoutes
};