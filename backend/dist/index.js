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
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/run", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const code = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.code;
        yield promises_1.default.writeFile("./src/temp/index.js", code);
        const run = (0, child_process_1.spawn)("docker", [
            "run",
            "--rm",
            "-v",
            `./src/temp:/app`,
            "-w",
            "/app",
            "nodejs",
            "node",
            "index.js",
        ], { shell: true });
        let output = "";
        run.stdout.on("data", (data) => {
            output += data;
        });
        run.stdout.on("close", () => {
            return res.status(200).json({
                "output": output
            });
        });
    }
    catch (e) {
        res.status(500).json({ msg: e.message });
    }
}));
app.listen(3000, () => {
    console.log("server started at 3000");
});
