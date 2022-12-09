"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnectionString = void 0;
const getDbConnectionString = () => {
    return process.env.MONGO_DB_CONNECTION_STRING;
};
exports.getDbConnectionString = getDbConnectionString;
//# sourceMappingURL=DBSetup.js.map