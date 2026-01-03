import express from "express";
import fs from "fs/promises";
import { spawn } from "child_process";
import path from "path";

const app = express();
app.use(express.json());

app.post("/run", async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).json({ msg: "Code required" });
    }

    const tempDir = path.resolve(process.cwd(), "src", "temp");
    const dockerPath = tempDir.replace(/\\/g, "/");
    const filePath = path.join(tempDir, "index.js");

    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(filePath, code);

    const run = spawn(
      "docker.exe",
      [
        "run",
        "-d",
        "-v", `${dockerPath}:/app`,
        "-w", "/app",
        "nodejs",
        "node",
        "index.js"
      ],
      {
        stdio: ["ignore", "pipe", "pipe"]
      }
    );

    let containerId = "";

   run.stdout.once("data", (data) => {
  const containerId = data.toString().trim();
  console.log("container id:", containerId);

  const logs = spawn(
    "docker.exe",
    ["logs", containerId],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let output = "";
  let error = "";

  logs.stdout.on("data", d => output += d.toString());
  logs.stderr.on("data", d => error += d.toString());

  logs.on("close", () => {
    spawn("docker.exe", ["rm", "-f", containerId]);

    res.json({
      output: output.trim(),
      error: error.trim() || null
    });
  });
});


    run.on("error", (err) => {
      return res.status(500).json({
        msg: "Docker run failed",
        error: err.message
      });
    });

   

  } catch (e: any) {
    return res.status(500).json({
      msg: e.message
    });
  }
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
