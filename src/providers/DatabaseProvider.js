const DataBase = {
    issues: {}
};

class DatabaseProvider {
    constructor(config) {
        this.config = config;
    }

    setIssue(issue) {
        DataBase.issues[issue.id] = issue;
    }

    getIssueById(id) {
        return DataBase.issues[id];
    }

    getIssues() {
        return Object.values(DataBase.issues);
    }

    deleteIssue(id) {
        delete DataBase.issues[id];
    }
}

module.exports = DatabaseProvider;