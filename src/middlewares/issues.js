const { IssueStatesTransitions } = require('../models/Issue.js');

const validateRequiredPostIssueBodyFields = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).send({ error: 'Missing required param: "title"' });
    }

    next();
};

const validateRequiredPutIssueBodyFields = (req, res, next) => {
    const requiredParams = ['title', 'description', 'state'];

    for (const param of requiredParams) {
        if (!req.body[param]) {
            return res.status(400).send({ error: `Missing required param: "${param}"` });
        }
    }

    next();
};

const validateIssueState = dbProvider => (req, res, next) => {
    const destinationState = req.body.state;

    if (destinationState && !(destinationState in IssueStatesTransitions)) {
        const error = `Invalid issue state: ${destinationState}. Allowed states: ${Object.keys(IssueStatesTransitions)}.`;
        return res.status(400).send({ error });
    }

    if (destinationState) {
        const issue = req.body._issue || dbProvider.getIssueById(req.params.issueId);

        if (issue) {
            const currentState = issue.state;

            if (!IssueStatesTransitions[currentState].has(destinationState)) {
                const error = `Cannot change state of an issue from current state "${currentState}" to destination state "${destinationState}".` +
                    `Allowed destination states: ${Array.from(IssueStatesTransitions[currentState])}.`;
                return res.status(400).send({ error });
            }
        }

        req.body._issue = issue;
    }

    next();
};

const validateIssueExists = dbProvider => (req, res, next) => {
    const issueId = req.params.issueId;
    const issue = dbProvider.getIssueById(issueId);

    if (!issue) {
        return res.status(404).send({ error: `Issue ${issueId} not found` });
    }

    req.body._issue = issue;
    next();
};


module.exports = {
    validateIssueExists,
    validateIssueState,
    validateRequiredPutIssueBodyFields,
    validateRequiredPostIssueBodyFields
};