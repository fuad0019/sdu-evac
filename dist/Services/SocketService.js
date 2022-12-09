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
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const EmotionDataBackgroundProcessor_1 = require("./EmotionDataBackgroundProcessor");
const __1 = require("..");
const Telemetry_1 = __importDefault(require("../Models/Telemetry"));
const ExperimentReport_1 = __importDefault(require("../Models/ExperimentReport"));
const TaskCompletionStatus_1 = __importDefault(require("./../Models/TaskCompletionStatus"));
class SocketService {
    constructor(server) {
        this.onTelemetry = (socket) => {
            const telemetryController = __1.app.get('TelemetryController');
            socket.on("telemetry", (data) => {
                telemetryController.create(new Telemetry_1.default(data.name, data.duration));
            });
        };
        this.onExperimentStarted = (socket) => {
            const usersController = __1.app.get('UsersController');
            socket.on("experiment-started", (data) => __awaiter(this, void 0, void 0, function* () {
                usersController.get(data.userId).then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        const experimentReport = user.getExperimentReports().find((experimentReport) => experimentReport.getExperimentNumber() === data.experimentNumber);
                        if (!experimentReport) {
                            user.addExperimentReport(new ExperimentReport_1.default(data.experimentNumber, data.experimentName, data.experimentType, data.timestamp));
                            yield usersController.update(user.getId(), user);
                        }
                        else {
                            yield usersController.updateField(user.getId(), `experimentReports.${data.experimentNumber - 1}.experimentStarted`, data.timestamp);
                        }
                    }
                }));
            }));
        };
        this.onExperimentEnded = (socket) => {
            const usersController = __1.app.get('UsersController');
            socket.on("experiment-ended", (data) => {
                usersController.get(data.userId).then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        const experimentReport = user.getExperimentReports().find((experimentReport) => experimentReport.getExperimentNumber() === data.experimentNumber);
                        if (experimentReport) {
                            experimentReport.setExperimentEnded(data.timestamp);
                            experimentReport.setTaskCompletionStatus(new TaskCompletionStatus_1.default(data.distanceToDestination, data.taskCompleted));
                            yield usersController.update(user.getId(), user);
                        }
                    }
                }));
            });
        };
        /**
         * The data property of the emotion-recorded event is expected to
         * have the following structure:
         *  {
         *    userId: string,
         *    experimentNumber: 1 | 2 | 3 | 4,
         *    emotions: {
         *      emotionName: string,
         *      intensity: number
         *    }[],
         *    timesliceStart: number,
         *    timesliceEnd: number
         *  }
         */
        this.onEmotionRecorded = (socket) => {
            socket.on('emotion-recorded', (emotionData) => __awaiter(this, void 0, void 0, function* () {
                yield EmotionDataBackgroundProcessor_1.emotionProcessQueue.add('EmotionProcessingJob', {
                    emotionData: emotionData,
                    clientSocketId: socket.id,
                    jobType: "emotion"
                });
            }));
        };
        SocketService.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        SocketService.io.on('connection', (socket) => {
            if (process.env.NODE_ENV === 'development') {
                this.onTestMessage(socket);
            }
            this.onJoin(socket);
            this.onLeave(socket);
            //this.onTelemetry(socket);
            this.onExperimentStarted(socket);
            this.onExperimentEnded(socket);
            this.onEmotionRecorded(socket);
        });
        SocketService.io.on('disconnect', (socket) => {
            this.onLeave(socket);
        });
    }
    static getServerSocket() {
        return SocketService.io;
    }
    onJoin(socket) {
        socket.on('join-room', (roomId) => {
            socket.join(roomId);
        });
    }
    onLeave(socket) {
        socket.on('leave-room', (roomId) => {
            socket.leave(roomId);
        });
    }
    onTestMessage(socket) {
        // Used to acknowledge received data
        socket.on("test-message", () => {
            SocketService.io.to(socket.id).emit("ack");
        });
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=SocketService.js.map