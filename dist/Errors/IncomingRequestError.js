"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncomingRequestError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, IncomingRequestError.prototype);
    }
}
exports.default = IncomingRequestError;
//# sourceMappingURL=IncomingRequestError.js.map