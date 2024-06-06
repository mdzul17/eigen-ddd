const createServer = require("../src/Infrastructures/http/createServer");

const app = require("../src/Infrastructures/http/createServer")

(async() => {
    const app = await createServer();
    const port = process.env.PORT || 1337;
    app.listen(port, () => console.log("listening on port " + port));
})();