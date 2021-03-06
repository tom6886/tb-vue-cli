#!/usr/bin/env node
"use strict";
process.env.NODE_PATH = __dirname + "/../node_modules/";
const program = require("commander");
const exec = require("child_process").exec;
const config = require("./template.json");
const packageJson = require("./package.json");

program
  .version(packageJson.version, "-v, --version")
  .command("create <app-name>")
  .description("create a new project powered by tb-vue-cli")
  .action(appName => {
    let workerProcess = exec(
      "git clone " + config.git.url + " " + appName,
      function(error) {
        if (error !== null) {
          console.log("exec error: " + error);
          return;
        }

        console.log("success");
        process.exit();
      }
    );

    workerProcess.stdout.on("data", function(data) {
      console.log(data);
    });

    workerProcess.stderr.on("data", function(data) {
      console.log(data);
    });
  });

program.parse(process.argv);
