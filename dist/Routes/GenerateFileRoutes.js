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
exports.generateFileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const IncomingRequestError_1 = __importDefault(require("../Errors/IncomingRequestError"));
const FileGenerator_1 = require("../Services/FileGenerator");
const fs_1 = __importDefault(require("fs"));
exports.generateFileRoutes = express_1.default.Router();
exports.generateFileRoutes.post("/validExperiments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let experiments = null;
    try {
        if (!req.body.participants)
            throw new IncomingRequestError_1.default("The participants must be provided");
        if (!req.body.radioSurveys)
            throw new IncomingRequestError_1.default("The participants must be provided");
        if (!req.body.textSurveys)
            throw new IncomingRequestError_1.default("The participants must be provided");
        if (req.body.experiments) {
            experiments = req.body.experiments;
        }
        const participants = req.body.participants;
        const radioSurveys = req.body.radioSurveys;
        const textSurveys = req.body.textSurveys;
        (0, FileGenerator_1.GenerateValidExperimentsExcel)(participants, radioSurveys, textSurveys, experiments);
        res.sendStatus(200);
    }
    catch (error) {
        return res.sendStatus(404);
    }
}));
exports.generateFileRoutes.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const path = './emotionData.xlsx';
        if (fs_1.default.existsSync(path)) {
            return res.download(path, function (err) {
                if (!err) {
                    const excelPath = './emotionData.xlsx';
                    const csvPath = './emotionData.csv';
                    try {
                        if (fs_1.default.existsSync(excelPath)) {
                            fs_1.default.unlinkSync(excelPath);
                        }
                    }
                    catch (err) {
                        console.error(err);
                    }
                    try {
                        if (fs_1.default.existsSync(csvPath)) {
                            fs_1.default.unlinkSync(csvPath);
                        }
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            });
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (error) {
        return res.sendStatus(404);
    }
}));
//# sourceMappingURL=GenerateFileRoutes.js.map