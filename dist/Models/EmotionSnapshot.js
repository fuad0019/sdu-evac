"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Emotion_1 = __importDefault(require("./Emotion"));
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
class EmotionSnapshot {
    constructor(emotions, timesliceStart, timesliceEnd) {
        this.emotions = emotions;
        this.timesliceStart = timesliceStart;
        this.timesliceEnd = timesliceEnd;
    }
    getEmotions() {
        return this.emotions;
    }
    getTimesliceStart() {
        return this.timesliceStart;
    }
    getTimesliceEnd() {
        return this.timesliceEnd;
    }
    addEmotion(emotion) {
        this.emotions.push(emotion);
    }
    serialize() {
        return {
            emotions: this.emotions.map(emotion => emotion.serialize()),
            timesliceStart: +this.timesliceStart,
            timesliceEnd: +this.timesliceEnd
        };
    }
    static deserialize(queryResult) {
        if (queryResult &&
            queryResult.emotions &&
            queryResult.timesliceStart &&
            queryResult.timesliceEnd) {
            return new EmotionSnapshot(queryResult.emotions.map((emotion) => Emotion_1.default.deserialize(emotion)), new Date(queryResult.timesliceStart), new Date(queryResult.timesliceEnd));
        }
        throw new DeserializationError_1.default("The provided query result is not a valid emotion snapshot.");
    }
}
exports.default = EmotionSnapshot;
//# sourceMappingURL=EmotionSnapshot.js.map