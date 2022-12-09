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
require("reflect-metadata");
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const mongodb_1 = require("mongodb");
const index_1 = require("./index");
const DBSetup_1 = require("./Config/DBSetup");
const SocketService_1 = require("./Services/SocketService");
const UserController_1 = __importDefault(require("./Controllers/UserController"));
const MongoDBManager_1 = __importDefault(require("./Wrappers/MongoDBManager"));
const UserRoutes_1 = require("./Routes/UserRoutes");
const AuthRoutes_1 = require("./Routes/AuthRoutes");
const SurveyRoutes_1 = require("./Routes/SurveyRoutes");
const Health_1 = require("./Routes/Health");
const TextSurveyController_1 = __importDefault(require("./Controllers/TextSurveyController"));
const ScaleSurveyController_1 = __importDefault(require("./Controllers/ScaleSurveyController"));
const AdaptionRoutes_1 = require("./Routes/AdaptionRoutes");
const TelemetryController_1 = __importDefault(require("./Controllers/TelemetryController"));
const GenerateFileRoutes_1 = require("./Routes/GenerateFileRoutes");
let databaseManager;
const initializeControllers = () => {
    index_1.app.set('UsersController', new UserController_1.default(databaseManager)); // TODO: Add controllers for surveys
    index_1.app.set('TextSurveyController', new TextSurveyController_1.default(databaseManager));
    index_1.app.set('ScaleSurveyController', new ScaleSurveyController_1.default(databaseManager));
    index_1.app.set('TelemetryController', new TelemetryController_1.default(databaseManager));
};
mongodb_1.MongoClient.connect((0, DBSetup_1.getDbConnectionString)(), (err, client) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || !client) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        try {
            const server = http_1.default.createServer(index_1.app);
            const port = process.env.PORT;
            server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
                const db = client.db(process.env.MONGO_DB_NAME);
                index_1.app.set('database', db);
                databaseManager = new MongoDBManager_1.default();
                initializeControllers();
                index_1.app.set('socketService', new SocketService_1.SocketService(server));
            }));
        }
        catch (error) {
            console.log('Error while starting server:', error);
        }
    }
}));
// Initialize routes
index_1.app.use('/users', UserRoutes_1.userRoutes);
index_1.app.use('/auth', AuthRoutes_1.authRoutes);
index_1.app.use('/surveys', SurveyRoutes_1.surveyRoutes);
index_1.app.use('/adaptions', AdaptionRoutes_1.adaptionRoutes);
index_1.app.use('/health', Health_1.healthRouter);
index_1.app.use('/files/', GenerateFileRoutes_1.generateFileRoutes);
//# sourceMappingURL=ServerStart.js.map