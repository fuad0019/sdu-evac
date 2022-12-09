"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
class ExperimentTimestamps {
    constructor(startTime, endTime, userId, experimentReportNumber, id) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.userId = userId;
        this.experimentReportNumber = experimentReportNumber;
        this._id = id ? id : guid_typescript_1.Guid.create().toString().toString();
    }
    getId() {
        return this._id;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getUserId() {
        return this.userId;
    }
    getExperimentReportNumber() {
        return this.experimentReportNumber;
    }
    serialize() {
        return {
            _id: this._id,
            startTime: this.startTime,
            endTime: this.endTime,
            userId: this.userId,
            experimentReportNumber: this.experimentReportNumber
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult._id,
            queryResult.userId,
            queryResult.experimentReportNumber) {
            return new ExperimentTimestamps(queryResult.startTime, queryResult.endTime, queryResult.userId, queryResult.experimentReportNumber, queryResult._id);
        }
        throw new DeserializationError_1.default("The provided query result is not a valid ExperimentTimestamps.");
    }
}
exports.default = ExperimentTimestamps;
//# sourceMappingURL=ExperimentTimestamps.js.map