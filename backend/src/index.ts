import express from "express";
import fs from "fs/promises";
import { spawn } from "child_process";

const app = express();
app.use(express.json());

app.post("/run", async (req, res) => {
  try {
    const code = req?.body?.code;
    await fs.writeFile("./src/temp/index.js", code);

    const run = spawn(
      "docker",
      [
        "run",
        "--rm",
        "--memory", "128m",
        "-v",
        `./src/temp:/app`,
        "-w",
        "/app",
        "nodejs",
        "node",
        "index.js",
      ],
      { shell: true }
    );
    let output=""
    run.stdout.on("data",(data)=>{
      output+=data
    
    })
    run.stdout.on("close",()=>{
        return res.status(200).json({
        "output":output
      })
    })
    
  } catch (e: any) {
    res.status(500).json({ msg: e.message });
  }
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
