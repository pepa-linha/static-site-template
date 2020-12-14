const config = require("../config");
const chokidar = require("chokidar");
const { closeSync, openSync, readdir, utimesSync, writeFile } = require("fs");
const multiGlob = require("multi-glob");
const touch = path => {
    const time = new Date();
    try {
        utimesSync(path, time, time);
    } catch (err) {
        closeSync(openSync(path, "w"));
    }
};

chokidar
    .watch(config.styles.src, {
        persistent: true
    })
    .on("all", async (event, path) => {
        if (event === "add" || event === "unlink") {

            multiGlob.glob(config.styles.glob, function(error, fileNames) {
                if (error) {
                    console.error(error);
                } else {
                    let imports = "// This file is generated. DO NOT EDIT it manually.\n";

                    fileNames.forEach((fileName) => {
                        if (fileName !== `${config.styles.src}/${config.styles.main}`) {
                            imports += `@import "${fileName.replace(`${config.styles.src}/`, "")}"\n`;
                        }
                    })

                    writeFile(`${config.styles.src}/${config.styles.main}`, imports, function () {});
                    //touch("src/assets/styles/main.sass");
                }
            });
        }
    });



// Hotfix for HMR for posthtml-modules
// https://github.com/pugson/parcel-static-template
// https://github.com/parcel-bundler/parcel/issues/3218
chokidar
    .watch("src/module", {
        persistent: true
    })
    .on("all", async (event, path) => {
        if (event === "change") {
            readdir("src", (err, files) => {
                files.forEach(file => {
                    if (file.endsWith(".html")) {
                        touch(`src/${file}`);
                    }
                });
            });
        }
    });