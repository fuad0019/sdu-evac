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
exports.adaptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const Adaption_1 = __importDefault(require("../Models/Adaption"));
const IncomingRequestError_1 = __importDefault(require("./../Errors/IncomingRequestError"));
exports.adaptionRoutes = express_1.default.Router();
/**
 * Route for submitting adaption data.
 */
exports.adaptionRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId)
            throw new IncomingRequestError_1.default("The userId parameter must be provided");
        if (!req.body.experimentNumber)
            throw new IncomingRequestError_1.default("The adaptionData parameter must be provided");
        if (!req.body.adaptions)
            throw new IncomingRequestError_1.default("The adaptions parameter must be provided");
        const userController = __1.app.get('UsersController');
        const user = yield userController.get(req.body.userId);
        if (!user) {
            return res.status(404).send("The provided user id does not exist.");
        }
        const experimentReports = user.getExperimentReports();
        if (!experimentReports) {
            return res.status(404).send("The provided user does not have any experiment reports.");
        }
        const experimentReport = experimentReports.find((report) => report.getExperimentNumber() === req.body.experimentNumber);
        if (!experimentReport) {
            return res.status(404).send("The provided user does not have an experiment report for the provided experiment number.");
        }
        const adaptions = [];
        for (let i = 0; i < req.body.adaptions.length; i++) {
            adaptions.push(new Adaption_1.default(req.body.adaptions[i].adaptionName, new Date(req.body.adaptions[i].timestamp)));
        }
        userController.updateField(user.getId(), `experimentReports.${req.body.experimentNumber - 1}.adaptions`, adaptions).then((isUpdated) => {
            if (isUpdated) {
                return res.sendStatus(201);
            }
            ;
            return res.sendStatus(500);
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (error) {
        if (error instanceof IncomingRequestError_1.default) {
            return res.status(400).send(error.message);
        }
        else {
            return res.status(500).send(error);
        }
    }
}));
//# sourceMappingURL=AdaptionRoutes.js.map