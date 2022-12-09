"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeserializationError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, DeserializationError.prototype);
    }
}
exports.default = DeserializationError;
//# sourceMappingURL=DeserializationError.js.map