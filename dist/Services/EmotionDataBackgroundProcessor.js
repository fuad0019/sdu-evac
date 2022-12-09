"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emotionProcessQueue = void 0;
const bullmq_1 = require("bullmq");
const __1 = require("..");
const Emotion_1 = __importDefault(require("../Models/Emotion"));
const EmotionSnapshot_1 = __importDefault(require("../Models/EmotionSnapshot"));
const ExperimentReport_1 = __importDefault(require("../Models/ExperimentReport"));
const User_1 = __importDefault(require("../Models/User"));
const SocketService_1 = require("./SocketService");
const ioredis_1 = __importDefault(require("ioredis"));
const connectionString = process.env.REDIS_URI;
const connection = new ioredis_1.default(connectionString ? connectionString : '', {
    maxRetriesPerRequest: null
});
exports.emotionProcessQueue = new bullmq_1.Queue('EmotionProcessingQueue', { connection });
const emotionQueueEvents = new bullmq_1.QueueEvents('EmotionProcessingQueue', { connection });
const emotionWorker = new bullmq_1.Worker('EmotionProcessingQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    if (job.name === 'EmotionProcessingJob') {
        yield processEmotionQueueItem(job.data.emotionData, job.data.clientSocketId);
    }
}), { connection });
const processEmotionQueueItem = (data, clientSocketId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userController = __1.app.get('UsersController');
        // Get user from the database if it exists, otherwise create a new one
        let user = yield userController.get(data.userId !== undefined ? data.userId : '');
        if (!user) {
            user = new User_1.default(undefined, data.userId);
            yield userController.create(user);
        }
        // Check if the user has an associated experiment report for the current experiment
        let experimentReport = user.getExperimentReports().find((experimentReport) => experimentReport.getExperimentNumber() === data.experimentNumber);
        // If no experiment report exists, create one
        if (!experimentReport) {
            experimentReport = new ExperimentReport_1.default(data.experimentNumber, data.experimentName, data.experimentType, +new Date());
            user.addExperimentReport(experimentReport);
            yield userController.update(user.getId(), user);
        }
        // Create an array of all received emotions
        const emotions = data.emotions.map((emotion) => {
            return new Emotion_1.default(emotion.emotionName, emotion.intensity);
        }).sort((a, b) => {
            return b.getIntensity() - a.getIntensity();
        });
        // Create emotion snapshot and add it to the experiment report
        const emotionSnapshot = new EmotionSnapshot_1.default(emotions, new Date(data.timesliceStart), new Date(data.timesliceEnd));
        experimentReport.addEmotionSnapshot(emotionSnapshot);
        yield userController.updateField(user.getId(), `experimentReports.${data.experimentNumber - 1}.emotionSnapshots`, [...experimentReport.getEmotionSnapshots(), emotionSnapshot]);
        if (process.env.NODE_ENV === 'development') {
            SocketService_1.SocketService.getServerSocket().to(clientSocketId).emit('emotion-recorded-ack');
            ;
        }
    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        }
    }
});
emotionQueueEvents.on('completed', ({ jobId }) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('done processing job:', jobId);
    }
});
emotionQueueEvents.on('failed', ({ jobId, failedReason }) => {
    if (process.env.NODE_ENV === 'development') {
        console.error('error occured while processing job:', jobId, failedReason);
    }
});
//# sourceMappingURL=EmotionDataBackgroundProcessor.js.map