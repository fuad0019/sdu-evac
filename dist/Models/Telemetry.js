"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
class Telemetry {
    constructor(name, duration, id) {
        this.name = name;
        this.duration = duration;
        this._id = id ? id : guid_typescript_1.Guid.create().toString().toString();
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.name;
    }
    getDuration() {
        return this.duration;
    }
    serialize() {
        return {
            _id: this._id,
            name: this.name,
            duration: this.duration,
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult._id &&
            queryResult.name &&
            queryResult.duration) {
            return new Telemetry(queryResult.answers, queryResult.name, queryResult.duration);
        }
        throw new Error("The provided query result is not a valid Telemetry object");
    }
}
exports.default = Telemetry;
//# sourceMappingURL=Telemetry.js.map