"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskCompletionStatus {
    constructor(distanceToDestination, taskCompleted, id) {
        this.distanceToDestination = distanceToDestination;
        this.taskCompleted = taskCompleted;
    }
    getDistanceToDestination() {
        return this.distanceToDestination;
    }
    getTaskCompleted() {
        return this.taskCompleted;
    }
    serialize() {
        return {
            distanceToDestination: this.distanceToDestination,
            taskCompleted: this.taskCompleted,
        };
    }
    static deserialize(queryResult) {
        if (queryResult) {
            return new TaskCompletionStatus((queryResult.distanceToDestination !== null && queryResult.distanceToDestination !== undefined) ? queryResult.distanceToDestination : "Not registered", (queryResult.taskCompleted !== null && queryResult.taskCompleted !== undefined) ? queryResult.taskCompleted : false);
        }
        return undefined;
    }
}
exports.default = TaskCompletionStatus;
//# sourceMappingURL=TaskCompletionStatus.js.map