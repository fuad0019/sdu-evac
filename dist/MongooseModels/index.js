"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DBSetup_1 = require("../Config/DBSetup");
const role_model_1 = require("./role.model");
const user_model_1 = require("./user.model");
mongoose_1.default.Promise = global.Promise;
exports.db = {};
exports.db.mongoose = mongoose_1.default;
exports.db.user = user_model_1.User;
exports.db.role = role_model_1.Role;
exports.db.ROLES = ["user", "admin", "moderator"];
exports.db.mongoose
    .connect((0, DBSetup_1.getDbConnectionString)(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    initial();
})
    .catch((err) => {
    console.error("Connection error", err);
    process.exit();
});
function initial() {
    role_model_1.Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new role_model_1.Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
            });
            new role_model_1.Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
            });
            new role_model_1.Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
            });
        }
    });
}
//# sourceMappingURL=index.js.map