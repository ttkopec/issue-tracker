const { v4: uuid } = require('uuid');

class BaseEntity {
    constructor(title, id) {
        this._title = title;
        this.id = id || uuid();

        const time = new Date().toISOString();
        this.modificationTime = time;
        this.creationTime = time;
    }

    set title(val) {
        this._title = val;
        this.modificationTime = new Date().toISOString();
    }

    get title() {
        return this._title;
    }

    toObject() {
        return {
            id: this.id,
            title: this._title,
            modificationTime: this.modificationTime,
            creationTime: this.creationTime
        };
    }
}

module.exports = BaseEntity;