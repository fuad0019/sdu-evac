"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
class ScaleSurvey {
    constructor(answers, userId, experimentNumber, id) {
        this.answers = answers;
        this.userId = userId;
        this.experimentNumber = experimentNumber;
        this._id = id ? id : guid_typescript_1.Guid.create().toString().toString();
    }
    getId() {
        return this._id;
    }
    getAnswers() {
        return this.answers;
    }
    getExperimentNumber() {
        return this.experimentNumber;
    }
    serialize() {
        return {
            _id: this._id,
            answers: this.answers,
            userId: this.userId,
            experimentNumber: this.experimentNumber,
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult._id &&
            queryResult.answers &&
            queryResult.userId &&
            queryResult.experimentNumber) {
            return new ScaleSurvey(queryResult.answers, queryResult.userId, queryResult.experimentNumber, queryResult._id);
        }
        throw new Error("The provided query result is not a valid text survey.");
    }
}
exports.default = ScaleSurvey;
//# sourceMappingURL=ScaleSurvey.js.map