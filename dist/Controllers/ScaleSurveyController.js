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
Object.defineProperty(exports, "__esModule", { value: true });
const DBCollections_enum_1 = require("../Common/DBCollections.enum");
class ScaleSurveyController {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseManager.count(DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
        });
    }
    create(modelObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const createResult = yield this.databaseManager.save(modelObject, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
            return createResult;
        });
    }
    createMany(modelObjects) {
        return __awaiter(this, void 0, void 0, function* () {
            const createResult = yield this.databaseManager.saveMany(modelObjects, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
            return createResult;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const returnScaleSurvey = yield this.databaseManager.get(id.toString(), DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
                return returnScaleSurvey;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    getWithFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deserializedSCALE_SURVEYS = yield this.databaseManager.getWithFilter(filter, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
                return deserializedSCALE_SURVEYS;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    getRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deserializedSCALE_SURVEYS = yield this.databaseManager.getRange(start, end, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
                return deserializedSCALE_SURVEYS;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deserializedSCALE_SURVEYS = yield this.databaseManager.getAll(DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
                return deserializedSCALE_SURVEYS;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    update(oldModelObjectId, updatedModelObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.databaseManager.update(oldModelObjectId.toString(), updatedModelObject, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
            return updateResult;
        });
    }
    updateField(id, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.databaseManager.updateField(id.toString(), field, value, DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
            return updateResult;
        });
    }
    delete(modelObjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.databaseManager.delete(modelObjectId.toString(), DBCollections_enum_1.DBCollections.SCALE_SURVEYS);
            return deleteResult;
        });
    }
}
exports.default = ScaleSurveyController;
//# sourceMappingURL=ScaleSurveyController.js.map