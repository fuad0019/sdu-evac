"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
class Adaption {
    constructor(adaptionName, timestamp) {
        this.adaptionName = adaptionName;
        this.timestamp = timestamp;
    }
    getAdaptionName() {
        return this.adaptionName;
    }
    getTimestamp() {
        return this.timestamp;
    }
    serialize() {
        return {
            adaptionName: this.adaptionName,
            timestamp: +this.timestamp
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult.adaptionName &&
            queryResult.timestamp) {
            return new Adaption(queryResult.adaptionName, new Date(queryResult.timestamp));
        }
        throw new DeserializationError_1.default("The provided query result is not a valid adaption.");
    }
}
exports.default = Adaption;
//# sourceMappingURL=Adaption.js.map