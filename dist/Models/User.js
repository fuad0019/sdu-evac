"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
const ExperimentReport_1 = __importDefault(require("./ExperimentReport"));
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
class User {
    constructor(experimentReports, id) {
        this.experimentReports = experimentReports ? experimentReports : [];
        this._id = id ? id : guid_typescript_1.Guid.create().toString().toString();
    }
    getId() {
        return this._id;
    }
    getExperimentReports() {
        return this.experimentReports;
    }
    addExperimentReport(experimentReport) {
        this.experimentReports.push(experimentReport);
    }
    serialize() {
        return {
            _id: this._id,
            experimentReports: this.experimentReports.map(er => er.serialize())
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult._id) {
            let experimentReports = [];
            if (queryResult.experimentReports[0]) {
                experimentReports = queryResult.experimentReports.map((subqueryResult) => ExperimentReport_1.default.deserialize(subqueryResult));
            }
            return new User(experimentReports, queryResult._id);
        }
        throw new DeserializationError_1.default("The provided query result is not a valid user.");
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map