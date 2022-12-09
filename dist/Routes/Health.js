"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.healthRouter = express_1.default.Router();
exports.healthRouter.get("/", (req, res) => {
    return res.send("Ok");
});
//# sourceMappingURL=Health.js.map