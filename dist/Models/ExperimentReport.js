"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Adaption_1 = __importDefault(require("./Adaption"));
const EmotionSnapshot_1 = __importDefault(require("./EmotionSnapshot"));
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
const TaskCompletionStatus_1 = __importDefault(require("./TaskCompletionStatus"));
class ExperimentReport {
    constructor(experimentNumber, experimentName, experimentType, experimentStarted, experimentEnded, emotionSnapshots, adaptions, taskCompletionStatus) {
        this.experimentNumber = experimentNumber;
        this.experimentName = experimentName;
        this.experimentType = experimentType;
        this.experimentStarted = experimentStarted;
        this.experimentEnded = experimentEnded;
        this.emotionSnapshots = emotionSnapshots ? emotionSnapshots : [];
        this.adaptions = adaptions ? adaptions : [];
        this.taskCompletionStatus = taskCompletionStatus;
    }
    getExperimentNumber() {
        return this.experimentNumber;
    }
    getExperimentName() {
        return this.experimentName;
    }
    getExperimentType() {
        return this.experimentType;
    }
    getEmotionSnapshots() {
        return this.emotionSnapshots;
    }
    getAdaptions() {
        return this.adaptions;
    }
    getTaskCompletionStatus() {
        return this.taskCompletionStatus;
    }
    getExperimentStarted() {
        return this.experimentStarted;
    }
    getExperimentEnded() {
        return this.experimentEnded;
    }
    setExperimentStarted(experimentStarted) {
        this.experimentStarted = experimentStarted;
    }
    setExperimentEnded(experimentEnded) {
        this.experimentEnded = experimentEnded;
    }
    setTaskCompletionStatus(taskCompletionStatus) {
        this.taskCompletionStatus = taskCompletionStatus;
    }
    addEmotionSnapshot(emotionSnapshot) {
        this.emotionSnapshots.push(emotionSnapshot);
    }
    addAdaption(adaption) {
        this.adaptions.push(adaption);
    }
    serialize() {
        return {
            experimentNumber: this.experimentNumber,
            experimentName: this.experimentName,
            experimentType: this.experimentType,
            emotionSnapshots: this.emotionSnapshots.map(es => es.serialize()),
            adaptions: this.adaptions.map(a => a.serialize()),
            experimentStarted: this.experimentStarted,
            experimentEnded: this.experimentEnded,
            taskCompletionStatus: this.taskCompletionStatus
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult.experimentNumber &&
            queryResult.experimentName &&
            queryResult.experimentType &&
            queryResult.experimentStarted) {
            let emotionSnapshots = [];
            let adaptions = [];
            if (queryResult.emotionSnapshots) {
                emotionSnapshots = queryResult.emotionSnapshots.map((subqueryResult) => EmotionSnapshot_1.default.deserialize(subqueryResult));
            }
            if (queryResult.adaptions) {
                adaptions = queryResult.adaptions.map((subqueryResult) => Adaption_1.default.deserialize(subqueryResult));
            }
            return new ExperimentReport(queryResult.experimentNumber, queryResult.experimentName, queryResult.experimentType, queryResult.experimentStarted, queryResult.experimentEnded, emotionSnapshots, adaptions, TaskCompletionStatus_1.default.deserialize(queryResult.taskCompletionStatus));
        }
        throw new DeserializationError_1.default("The provided query result is not a valid experiment report.");
    }
}
exports.default = ExperimentReport;
//# sourceMappingURL=ExperimentReport.js.map