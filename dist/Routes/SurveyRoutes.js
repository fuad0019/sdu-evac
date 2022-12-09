"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const IncomingRequestError_1 = __importDefault(require("./../Errors/IncomingRequestError"));
const TextSurvey_1 = __importDefault(require("./../Models/TextSurvey"));
const ScaleSurvey_1 = __importDefault(require("./../Models/ScaleSurvey"));
exports.surveyRoutes = express_1.default.Router();
/**
 * Route for submitting text surveys.
 */
exports.surveyRoutes.post("/text", (req, res) => {
    try {
        if (!Array.isArray(req.body.answers) || req.body.answers.length <= 0)
            throw new IncomingRequestError_1.default("The answers parameter must be a non-empty array");
        if (!req.body.userId)
            throw new IncomingRequestError_1.default("The userId parameter must be provided");
        const surveyController = __1.app.get('TextSurveyController');
        const survey = new TextSurvey_1.default(req.body.answers, req.body.userId);
        surveyController.create(survey).then((isInserted) => {
            if (isInserted) {
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
});
/**
 * Route for submitting scale surveys.
 */
exports.surveyRoutes.post("/scale", (req, res) => {
    try {
        if (!Array.isArray(req.body.answers) || req.body.answers.length <= 0)
            throw new IncomingRequestError_1.default("The answers parameter must be a non-empty array");
        if (!req.body.userId)
            throw new IncomingRequestError_1.default("The userId parameter must be provided");
        if (!req.body.experimentNumber)
            throw new IncomingRequestError_1.default("The experimentNumber parameter must be provided");
        const surveyController = __1.app.get('ScaleSurveyController');
        const survey = new ScaleSurvey_1.default(req.body.answers, req.body.userId, req.body.experimentNumber);
        surveyController.create(survey).then((isInserted) => {
            if (isInserted) {
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
            console.log(error.message);
            return res.status(400).send(error.message);
        }
        else {
            return res.status(500).send(error);
        }
    }
});
/**
 * Route for getting all text surveys.
 */
exports.surveyRoutes.get("/text/all", (req, res) => {
    try {
        const surveyController = __1.app.get('TextSurveyController');
        surveyController.getAll().then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
 * Route for getting all scale surveys.
 */
exports.surveyRoutes.get("/scale/all", (req, res) => {
    try {
        const surveyController = __1.app.get('ScaleSurveyController');
        surveyController.getAll().then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
  * Route for getting all text surveys for a specific user.
  */
exports.surveyRoutes.get("/text/users/:userId", (req, res) => {
    try {
        const surveyController = __1.app.get('TextSurveyController');
        surveyController.getWithFilter({ "userId": req.params.userId }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found for user");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
 * Route for getting all scale surveys for a specific user.
 */
exports.surveyRoutes.get("/scale/users/:userId", (req, res) => {
    try {
        const surveyController = __1.app.get('ScaleSurveyController');
        surveyController.getWithFilter({ "userId": req.params.userId }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found for user");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
  * Route for getting all scale surveys for a specific experiment number.
  */
exports.surveyRoutes.get("/scale/experiment/:experimentNumber", (req, res) => {
    try {
        const surveyController = __1.app.get('ScaleSurveyController');
        surveyController.getWithFilter({ "experimentNumber": +req.params.experimentNumber }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found for experiment number");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
 * Route for getting all scale surveys for a specific user and experiment number.
 */
exports.surveyRoutes.get("/scale/:userId/:experimentNumber", (req, res) => {
    try {
        const surveyController = __1.app.get('ScaleSurveyController');
        surveyController.getWithFilter({ "userId": req.params.userId, "experimentNumber": +req.params.experimentNumber }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys);
            }
            else {
                return res.status(404).send("No surveys found for user and experiment number");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
 * Route for getting all text surveys with a specific id.
 */
exports.surveyRoutes.get("/text/:id", (req, res) => {
    try {
        const surveyController = __1.app.get('TextSurveyController');
        surveyController.getWithFilter({ "_id": req.params.id }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys[0]);
            }
            else {
                return res.status(404).send("No surveys found with id");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
/**
 * Route for getting all scale surveys with a specific id.
 */
exports.surveyRoutes.get("/scale/:id", (req, res) => {
    try {
        const surveyController = __1.app.get('ScaleSurveyController');
        surveyController.getWithFilter({ "_id": req.params.id }).then((surveys) => {
            if (surveys && surveys.length > 0) {
                return res.send(surveys[0]);
            }
            else {
                return res.status(404).send("No surveys found with id");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
//# sourceMappingURL=SurveyRoutes.js.map