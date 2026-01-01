import express from "express";
import fs from "fs/promises";
import { existsSync } from "fs";
import { spawn } from "child_process";
import path from "path";

const dir = path.join(process.cwd(), "src", "temp");
const app = express();
app.use(express.json());

app.post("/run", async(req, res) => {
  try{
    const code = req.body.code;
  console.log("CODE:", code);

  await fs.writeFile("./src/temp/index.js",code);
const docker = spawn("docker", [
  "run",
  "--rm",
  "-v", `${dir}:/app`,
  "nodejs",
  "node",
  "index.js"
]);  let output =""
let error = "";

docker.stderr.on("data", (data) => {
  error += data.toString();
});
  docker.stdout.on('data',(data)=>{
    output += data.toString();
  })
  docker.on("close", (code) => {
  console.log("Exit code:", code);
  console.log("Output:", output);
  return res.status(200).json({
  output:output,
  error:error
})
});

  }
  catch(e:any){
    return res.status(400).json({
      msg:e.message
    })
  }
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
