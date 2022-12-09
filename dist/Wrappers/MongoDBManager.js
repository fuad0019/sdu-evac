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
const index_1 = require("../index");
const User_1 = __importDefault(require("../Models/User"));
const DBCollections_enum_1 = require("../Common/DBCollections.enum");
const PersistenceError_1 = __importDefault(require("./../Errors/PersistenceError"));
const TextSurvey_1 = __importDefault(require("../Models/TextSurvey"));
const ScaleSurvey_1 = __importDefault(require("../Models/ScaleSurvey"));
const Telemetry_1 = __importDefault(require("../Models/Telemetry"));
class MongoDbmanager {
    constructor() {
        this.db = index_1.app.get('database');
    }
    count(dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                return yield this.db.collection(dbCollection).countDocuments();
            }
            catch (error) {
                return 0;
            }
        });
    }
    save(object, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const insertResult = yield this.db.collection(dbCollection).updateOne({ _id: object.getId() }, { $setOnInsert: object.serialize() }, { upsert: true });
                return insertResult.acknowledged;
            }
            catch (error) {
                throw new PersistenceError_1.default('An error occurred while saving to the database:' + error);
            }
        });
    }
    saveMany(objects, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const insertResult = yield this.db.collection(dbCollection).insertMany(objects.map(o => o.serialize()));
                if (insertResult.insertedCount !== objects.length) {
                    throw new PersistenceError_1.default(`Not all objects were saved to the database. ${insertResult.insertedCount}/${objects.length} objects were saved.`);
                }
                ;
                return true;
            }
            catch (error) {
                throw new PersistenceError_1.default('An error occurred while saving to the database');
            }
        });
    }
    get(id, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const queryResult = yield this.db.collection(dbCollection).findOne({ _id: id });
                if (!queryResult) {
                    throw new PersistenceError_1.default(`No object with id ${id} was found in the database.`);
                }
                const resultObject = yield this.createModelObjectFromQueryResult(queryResult, dbCollection);
                if (resultObject) {
                    return resultObject;
                }
                throw new Error();
            }
            catch (error) {
                console.log(error);
                throw new PersistenceError_1.default('An error occurred while getting an object from the database.');
            }
        });
    }
    getWithFilter(filter, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const resultArray = [];
                const queryResult = yield this.db.collection(dbCollection).find(filter).toArray();
                if (!queryResult) {
                    throw new PersistenceError_1.default(`No objects were found in the database.`);
                }
                for (let i = 0; i < queryResult.length; i++) {
                    resultArray.push(yield this.createModelObjectFromQueryResult(queryResult[i], dbCollection));
                }
                if (resultArray.length > 0) {
                    return resultArray;
                }
                throw new Error();
            }
            catch (error) {
                throw new PersistenceError_1.default(`An error occurred while getting objects from the database.`);
            }
        });
    }
    getMany(ids, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const resultArray = [];
                const queryResult = yield this.db.collection(dbCollection).find({ _id: { $in: ids } }).toArray();
                if (!queryResult) {
                    throw new PersistenceError_1.default(`No objects with ids ${ids} were found in the database.`);
                }
                for (let i = 0; i < queryResult.length; i++) {
                    resultArray.push(yield this.createModelObjectFromQueryResult(queryResult[i], dbCollection));
                }
                if (resultArray.length > 0) {
                    return resultArray;
                }
                throw new Error();
            }
            catch (error) {
                throw new PersistenceError_1.default('An error occurred while getting objects from the database.');
            }
        });
    }
    getRange(start, end, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const queryResult = yield this.db.collection(dbCollection).find({}).sort({ _id: 1 }).skip(start).limit(end - start).toArray();
                if (!queryResult) {
                    throw new PersistenceError_1.default(`No objects were found in the database.`);
                }
                const resultArray = [];
                for (let i = 0; i < queryResult.length; i++) {
                    resultArray.push(yield this.createModelObjectFromQueryResult(queryResult[i], dbCollection));
                }
                if (resultArray.length > 0) {
                    return resultArray;
                }
                throw new Error();
            }
            catch (error) {
                throw new PersistenceError_1.default('An error occurred while getting objects from the database.');
            }
        });
    }
    getAll(dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const queryResult = yield this.db.collection(dbCollection).find({}).toArray();
                if (!queryResult) {
                    throw new PersistenceError_1.default(`No objects were found in the database.`);
                }
                const resultArray = [];
                for (let i = 0; i < queryResult.length; i++) {
                    resultArray.push(yield this.createModelObjectFromQueryResult(queryResult[i], dbCollection));
                }
                if (resultArray.length > 0) {
                    return resultArray;
                }
                throw new Error();
            }
            catch (error) {
                throw new PersistenceError_1.default('An error occurred while getting objects from the database.');
            }
        });
    }
    update(id, object, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const updateResult = yield this.db.collection(dbCollection).updateOne({ _id: id }, { $set: object.serialize() });
                if (updateResult.modifiedCount === 1) {
                    return true;
                }
                throw new PersistenceError_1.default(`An error occurred while updating the object with id ${id} in the database.`);
            }
            catch (error) {
                return false;
            }
        });
    }
    updateField(id, field, value, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const updateResult = yield this.db.collection(dbCollection).updateOne({ _id: id }, { $set: { [field]: value } });
                if (updateResult.modifiedCount === 1) {
                    return true;
                }
                throw new PersistenceError_1.default(`An error occurred while updating the object with id ${id} in the database.`);
            }
            catch (error) {
                return false;
            }
        });
    }
    delete(id, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const deleteResult = yield this.db.collection(dbCollection).deleteOne({ _id: id });
                if (deleteResult.deletedCount === 1) {
                    return true;
                }
                throw new PersistenceError_1.default(`An error occurred while deleting the object with id ${id} from the database.`);
            }
            catch (error) {
                return false;
            }
        });
    }
    deleteAll(dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setDb();
                const deleteResult = yield this.db.collection(dbCollection).deleteMany({});
                if (deleteResult.deletedCount > 0) {
                    return true;
                }
                throw new PersistenceError_1.default(`An error occurred while deleting all objects from the database.`);
            }
            catch (error) {
                return false;
            }
        });
    }
    createModelObjectFromQueryResult(queryResult, dbCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (dbCollection) {
                case DBCollections_enum_1.DBCollections.USERS:
                    return User_1.default.deserialize(queryResult);
                case DBCollections_enum_1.DBCollections.TEXT_SURVEYS:
                    return TextSurvey_1.default.deserialize(queryResult);
                case DBCollections_enum_1.DBCollections.SCALE_SURVEYS:
                    return ScaleSurvey_1.default.deserialize(queryResult);
                case DBCollections_enum_1.DBCollections.TELEMETRY:
                    return Telemetry_1.default.deserialize(queryResult);
                default:
                    break;
            }
            throw new Error('Unknown database collection');
        });
    }
    setDb() {
        if (!this.db) {
            this.db = index_1.app.get('database');
        }
    }
}
exports.default = MongoDbmanager;
//# sourceMappingURL=MongoDBManager.js.map