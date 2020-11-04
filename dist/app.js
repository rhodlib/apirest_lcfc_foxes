"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const match_1 = __importDefault(require("./routes/match"));
const app = express_1.default();
//Settings
app.set('port', 3000);
//Middlewares
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
//Routes
app.use('/api/auth', auth_1.default);
app.use('/api/match', match_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map