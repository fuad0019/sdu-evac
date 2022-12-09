"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
class TextSurvey {
    constructor(answers, userId, id) {
        this.answers = answers;
        this.userId = userId;
        this._id = id ? id : guid_typescript_1.Guid.create().toString().toString();
    }
    getId() {
        return this._id;
    }
    getAnswers() {
        return this.answers;
    }
    serialize() {
        return {
            _id: this._id,
            answers: this.answers,
            userId: this.userId
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult._id &&
            queryResult.answers &&
            queryResult.userId) {
            return new TextSurvey(queryResult.answers, queryResult.userId, queryResult._id);
        }
        throw new Error("The provided query result is not a valid text survey.");
    }
}
exports.default = TextSurvey;
//# sourceMappingURL=TextSurvey.js.map