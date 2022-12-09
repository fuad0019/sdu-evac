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
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const User_1 = __importDefault(require("../Models/User"));
const IncomingRequestError_1 = __importDefault(require("./../Errors/IncomingRequestError"));
exports.userRoutes = express_1.default.Router();
/**
 * Expects a JSON object in the body of the request with the following format:
 * {
 *  start: number,
 *  end: number
 * }
 * Start and end are the indexes of the range of users to return.
 * Start is inclusive, end is exclusive.
 */
exports.userRoutes.get("/range", (req, res) => {
    try {
        if (isNaN(req.body.start) || isNaN(req.body.end))
            throw new IncomingRequestError_1.default("The start and end parameters must be numbers");
        if (req.body.start < 0 || req.body.end < 0)
            throw new IncomingRequestError_1.default("The start and end parameters must be positive numbers");
        const usersController = __1.app.get('UsersController');
        usersController.getRange(req.body.start, req.body.end).then((users) => {
            if (users && users.length > 0) {
                return res.send(users);
            }
            else {
                return res.status(404).send(`No users found. Current amount of users: ${countUsers()}`);
            }
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
exports.userRoutes.get("/all", (req, res) => {
    try {
        const usersController = __1.app.get('UsersController');
        usersController.getAll().then((users) => {
            if (users && users.length > 0) {
                return res.send(users);
            }
            else {
                return res.status(404).send("No users found");
            }
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
    }
});
exports.userRoutes.get("/count", (req, res) => {
    try {
        countUsers().then((count) => {
            return res.send({
                userCount: count
            });
        }).catch(() => {
            return res.sendStatus(500);
        });
    }
    catch (_a) {
        return res.sendStatus(500);
    }
});
exports.userRoutes.get("/:id", (req, res) => {
    const userId = req.params.id;
    buildUserReport(userId).then((user) => {
        if (user) {
            return res.send(user);
        }
        else {
            return res.status(404).send("User not found");
        }
    }).catch(() => {
        return res.sendStatus(500);
    });
});
// Connect user
exports.userRoutes.post('/connect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersController = __1.app.get("UsersController");
        const user = new User_1.default();
        const saveResult = yield usersController.create(user);
        if (!saveResult)
            throw new Error('Failed to save user');
        return res.status(201).send({
            userId: user.getId()
        });
    }
    catch (error) {
        if (error instanceof IncomingRequestError_1.default) {
            return res.status(400).send('Request failed: ' + error.message);
        }
        return res.status(500).send();
    }
}));
const buildUserReport = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userController = __1.app.get('UsersController');
        const user = yield userController.get(userId);
        return user;
    }
    catch (_a) {
        return undefined;
    }
});
const countUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userController = __1.app.get('UsersController');
        return yield userController.count();
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=UserRoutes.js.map