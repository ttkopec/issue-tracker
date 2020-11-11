const { handleMethodNotAllowed } = require('./commons.js');

const {
    validateIssueExists,
    validateIssueState,
    validateRequiredPutIssueBodyFields,
    validateRequiredPostIssueBodyFields
} = require('../middlewares/issues.js');

/**
 * @swagger
 * tags:
 *   name: Issues
 *   description: Issues management
 */

class IssuesRouteHandler {
    constructor(app, dbProvider, { issuesController }) {
        this.app = app;
        this.dbProvider = dbProvider;
        this.issuesController = issuesController;
        this.route = '/issues';

        this.setup();
    }

    setup() {
        /**
         * @swagger
         *  /issues:
         *    get:
         *      summary: Get all issues
         *      tags: [Issues]
         *      responses:
         *        "200":
         *          description: Array of issues
         *          content:
         *            application/json:
         *              schema:
         *                type: array
         *                items:
         *                  $ref: '#/components/schemas/Issue'
         *    post:
         *      summary: Create an issue
         *      tags: [Issues]
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                title:
         *                  required: true
         *                  type: string
         *                description:
         *                  type: string
         *      responses:
         *        "201":
         *          description: Created issue
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         *        "400":
         *          description: Missing required parameters
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         */
        this.app
            .get(this.route, (req, res) => this.issuesController.getIssues(req, res))
            .post(this.route, [
                validateRequiredPostIssueBodyFields,
                (req, res) => this.issuesController.postIssue(req, res)
            ])
            .all(this.route, handleMethodNotAllowed);

        /**
         * @swagger
         *  /issues/{issueId}:
         *    get:
         *      parameters:
         *        - in: path
         *          name: issueId
         *          required: true
         *          schema:
         *            type: string
         *          description: Issue identifier
         *      summary: Get a single issue
         *      tags: [Issues]
         *      responses:
         *        "200":
         *          description: Issue
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         *        "404":
         *          description: Issue does not exist
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         *    put:
         *      parameters:
         *        - in: path
         *          name: issueId
         *          required: true
         *          schema:
         *            type: string
         *          description: Issue identifier
         *      summary: Create or update an issue
         *      tags: [Issues]
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                title:
         *                  type: string
         *                  required: true
         *                description:
         *                  type: string
         *                  required: true
         *                state:
         *                  required: true
         *                  $ref: '#/components/schemas/IssueStates'
         *      responses:
         *        "201":
         *          description: Created issue
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         *        "200":
         *          description: Modified issue
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         *        "400":
         *          description: Missing required params or invalid issue state
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         *        "404":
         *          description: Issue does not exist
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         *    patch:
         *      parameters:
         *        - in: path
         *          name: issueId
         *          required: true
         *          schema:
         *            type: string
         *          description: Issue identifier
         *      summary: Update an issue
         *      tags: [Issues]
         *      requestBody:
         *        required: false
         *        content:
         *          application/json:
         *            schema:
         *              type: object
         *              properties:
         *                title:
         *                  type: string
         *                description:
         *                  type: string
         *                state:
         *                  $ref: '#/components/schemas/IssueStates'
         *      responses:
         *        "200":
         *          description: Modified issue
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         *        "404":
         *          description: Issue does not exist
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         *    delete:
         *      parameters:
         *        - in: path
         *          name: issueId
         *          required: true
         *          schema:
         *            type: string
         *          description: Issue identifier
         *      summary: Delete an issue
         *      tags: [Issues]
         *      responses:
         *        "204":
         *          description: Issue has been deleted
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Issue'
         */
        this.app
            .get(`${this.route}/:issueId`, [
                validateIssueExists(this.dbProvider),
                (req, res) => this.issuesController.getIssue(req, res)
            ])
            .put(`${this.route}/:issueId`, [
                validateRequiredPutIssueBodyFields,
                validateIssueState(this.dbProvider),
                (req, res) => this.issuesController.putIssue(req, res)
            ])
            .patch(`${this.route}/:issueId`, [
                validateIssueExists(this.dbProvider),
                validateIssueState(this.dbProvider),
                (req, res) => this.issuesController.patchIssue(req, res)
            ])
            .delete(`${this.route}/:issueId`, [
                (req, res) => this.issuesController.deleteIssue(req, res)
            ])
            .all(`${this.route}/:issueId`, handleMethodNotAllowed);
    }
}

module.exports = IssuesRouteHandler;
