"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
class Emotion {
    constructor(emotionName, intensity) {
        this.emotionName = emotionName;
        this.intensity = intensity;
    }
    getEmotionName() {
        return this.emotionName;
    }
    getIntensity() {
        return this.intensity;
    }
    serialize() {
        return {
            emotionName: this.emotionName,
            intensity: this.intensity
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult.emotionName &&
            queryResult.intensity) {
            return new Emotion(queryResult.emotionName, queryResult.intensity);
        }
        throw new DeserializationError_1.default("The provided query result is not a valid emotion.");
    }
}
exports.default = Emotion;
//# sourceMappingURL=Emotion.js.map