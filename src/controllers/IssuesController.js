const { Issue } = require('../models/Issue.js');

class IssuesController {
    constructor(dbProvider) {
        this.dbProvider = dbProvider;
    }

    getIssue(req, res) {
        return res.status(200).send(req.body._issue.toObject());
    }

    getIssues(req, res) {
        return res.status(200).send(this.dbProvider.getIssues().map(issue => issue.toObject()));
    }

    postIssue(req, res) {
        const { title, description } = req.body;
        const issue = new Issue(title, description);

        this.dbProvider.setIssue(issue);

        res.status(201).send(issue.toObject());
    }

    putIssue(req, res) {
        const { title, description, state, _issue: issue } = req.body;
        const { issueId } = req.params;

        if (!issue) {
            const newIssue = new Issue(title, description, state, issueId);

            this.dbProvider.setIssue(newIssue);

            res.status(201).send(newIssue.toObject());
        } else {
            issue.title = title;
            issue.description = description;
            issue.state = state;

            res.status(200).send(issue.toObject());
        }
    }

    patchIssue(req, res) {
        const { title, description, state: destinationState, _issue: issue } = req.body;

        if (title) {
            issue.title = title;
        }

        if (description) {
            issue.description = description;
        }

        if (destinationState) {
            issue.state = destinationState;
        }

        this.dbProvider.setIssue(issue);

        res.status(200).send(issue.toObject());
    }

    deleteIssue(req, res) {
        this.dbProvider.deleteIssue(req.params.issueId);
        res.status(204).end();
    }
}

module.exports = IssuesController;