// We load and connect our database (mongodb)
require("./databases");

const app = require("./app");
const config = require("config");

// Environment settings
const {
  app: { host, port, startMsg },
} = config;

// We start the express server
const expressServer = app.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const url = `http://${host}:${expressServer.address().port}`;
  const message = startMsg.replace(/\{0}/g, url);
  console.log(message, `or http://localhost:${expressServer.address().port}`);
});

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});
