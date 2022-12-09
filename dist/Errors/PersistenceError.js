"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersistenceError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, PersistenceError.prototype);
    }
}
exports.default = PersistenceError;
//# sourceMappingURL=PersistenceError.js.map