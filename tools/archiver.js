const config = require("../config.js");
const fs = require("fs");
const archiver = require("archiver");
const { name, version } = require("../package.json");
const { exec } = require("child_process");

let gitBranch = null;

exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
    if (!err && typeof stdout === "string") {
        gitBranch = stdout.trim();
    }
});

const fileName = config.archiver.fileMask
    .replace("%name%", name)
    .replace("%version%", version)
    .replace("%branch%", gitBranch !== null ? gitBranch : "")
    .replace(/^-+|-+$/g, "")
    .concat(".zip");

const output = fs.createWriteStream(fileName);
const archive = archiver("zip", {
    zlib: {
        level: 9
    }
});

archive.pipe(output);
archive.directory("dist", false);
archive.finalize();

console.info("Exported file:", fileName);
