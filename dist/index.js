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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/run", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(400).json({ msg: "Code required" });
        }
        const tempDir = path_1.default.resolve(process.cwd(), "src", "temp");
        const dockerPath = tempDir.replace(/\\/g, "/");
        const filePath = path_1.default.join(tempDir, "index.js");
        yield promises_1.default.mkdir(tempDir, { recursive: true });
        yield promises_1.default.writeFile(filePath, code);
        // 🔥 IMPORTANT: docker.exe, no shell
        const run = (0, child_process_1.spawn)("docker.exe", [
            "run",
            "-d",
            "-v", `${dockerPath}:/app`,
            "-w", "/app",
            "nodejs",
            "node",
            "index.js"
        ], {
            stdio: ["ignore", "pipe", "pipe"]
        });
        let containerId = "";
        run.stdout.on("data", (data) => {
            containerId += data.toString().trim();
        });
        run.on("error", (err) => {
            return res.status(500).json({
                msg: "Docker run failed",
                error: err.message
            });
        });
        // ✅ NOW close WILL FIRE
        run.on("close", () => {
            if (!containerId) {
                return res.status(500).json({
                    msg: "Container ID not received"
                });
            }
            console.log(`container id id `, containerId);
            // ---- READ LOGS ----
            const logs = (0, child_process_1.spawn)("docker.exe", ["logs", containerId], { stdio: ["ignore", "pipe", "pipe"] });
            let output = "";
            let error = "";
            logs.stdout.on("data", (data) => {
                output += data.toString();
            });
            logs.stderr.on("data", (data) => {
                error += data.toString();
            });
            logs.on("close", () => {
                // cleanup
                (0, child_process_1.spawn)("docker.exe", ["rm", "-f", containerId]);
                return res.json({
                    output: output.trim(),
                    error: error.trim() || null
                });
            });
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: e.message
        });
    }
}));
app.listen(3000, () => {
    console.log("server started at 3000");
});
