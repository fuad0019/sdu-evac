"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json({ limit: "50mb" }));
exports.app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
let corsOptions;
if (process.env.NODE_ENV === 'development') {
    corsOptions = {
        origin: "*"
    };
}
else {
    corsOptions = {
        origin: "https://iob.news"
    };
}
exports.app.use((0, cors_1.default)(corsOptions));
//# sourceMappingURL=index.js.map