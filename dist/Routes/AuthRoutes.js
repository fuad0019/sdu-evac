"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MongooseModels_1 = require("../MongooseModels");
const IncomingRequestError_1 = __importDefault(require("../Errors/IncomingRequestError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_config_1 = __importDefault(require("../Config/auth.config"));
exports.authRoutes = express_1.default.Router();
const ROLES = MongooseModels_1.db.ROLES;
const Role = MongooseModels_1.db.role;
const User = MongooseModels_1.db.user;
exports.authRoutes.post('/signup', (req, res) => {
    try {
        if (!req.body.email)
            throw new IncomingRequestError_1.default("The email parameter must be provided");
        if (!req.body.roles)
            throw new IncomingRequestError_1.default("The roles parameter must be provided");
        if (!req.body.password)
            throw new IncomingRequestError_1.default("The password parameter must be provided");
        // Check dupolicate email
        const u = User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
        });
        // Check role is valid
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return res.status(400).send({
                        message: `Failed! Role ${req.body.roles[i]} does not exist!`
                    });
                }
            }
        }
    }
    catch (error) {
        if (error instanceof IncomingRequestError_1.default) {
            return res.status(400).send(error.message);
        }
        else {
            return res.status(500).send(error);
        }
    }
    // Signup user
    const user = new User({
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    return res.send({ message: "User was registered successfully!" });
                });
            });
        }
        else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    return res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
});
exports.authRoutes.post("/signin", (req, res) => {
    try {
        User.findOne({
            email: req.body.email
        })
            .populate("roles", "-__v")
            .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            const passwordIsValid = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_config_1.default.secret, {
                expiresIn: 86400 // 24 hours
            });
            const authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            return res.status(200).send({
                id: user._id,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
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
//# sourceMappingURL=AuthRoutes.js.map