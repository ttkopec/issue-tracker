const BaseEntity = require('./BaseEntity.js');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Issue:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: string
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          state:
 *              $ref: '#/components/schemas/IssueStates'
 *          modificationTime:
 *            type: string
 *          creationTime:
 *            type: string
 *        example:
 *          id: 5e797752-7a54-4b1a-9a22-bcff1a90098f
 *          title: Super Issue
 *          description: Super easy issue
 *          state: PENDING
 *          modificationTime: 2021-10-25T15:51:01.093Z
 *          creationTime: 2020-10-25T15:51:01.093Z
 */
class Issue extends BaseEntity {
    constructor(title, description, state = IssueStates.PENDING, issueId = null) {
        super(title, issueId);

        this._state = state;
        this._description = description;
    }

    set state(val) {
        this._state = val;
        this.modificationTime = new Date().toISOString();
    }

    get state() {
        return this._state;
    }

    set description(val) {
        this._description = val;
        this.modificationTime = new Date().toISOString();
    }

    get description() {
        return this._description;
    }

    toObject() {
        return {
            state: this._state,
            description: this._description,
            ...super.toObject()
        };
    }
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      IssueStates:
 *        type: string
 *        enum:
 *          - OPEN
 *          - PENDING
 *          - CLOSED
 */
const IssueStates = {
    OPEN: 'OPEN',
    PENDING: 'PENDING',
    CLOSED: 'CLOSED'
};

/**
 * Describes all permitted issues state's transitions
 */
const IssueStatesTransitions = {
    OPEN: new Set([IssueStates.CLOSED]),
    PENDING: new Set([IssueStates.OPEN, IssueStates.CLOSED]),
    CLOSED: new Set()
};

module.exports = {
    Issue,
    IssueStates,
    IssueStatesTransitions
};