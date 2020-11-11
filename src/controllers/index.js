const IssuesController = require('./IssuesController.js');

const setupControllers = dbProvider => ({
    issuesController: new IssuesController(dbProvider)
});

module.exports = {
    setupControllers
};