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
const path_1 = __importDefault(require("path"));
const dir = path_1.default.join(process.cwd(), "src", "temp");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/run", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.body.code;
        console.log("CODE:", code);
        yield promises_1.default.writeFile("./src/temp/index.js", code);
        const docker = (0, child_process_1.spawn)("docker", [
            "run",
            "--rm",
            "-v", `${dir}:/app`,
            "nodejs",
            "node",
            "index.js"
        ]);
        let output = "";
        let error = "";
        docker.stderr.on("data", (data) => {
            error += data.toString();
        });
        docker.stdout.on('data', (data) => {
            output += data.toString();
        });
        docker.on("close", (code) => {
            console.log("Exit code:", code);
            console.log("Output:", output);
            return res.status(200).json({
                output: output,
                error: error
            });
        });
    }
    catch (e) {
        return res.status(400).json({
            msg: e.message
        });
    }
}));
app.listen(3000, () => {
    console.log("server started at 3000");
});
