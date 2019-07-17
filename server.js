const http = require("http");
const port = process.env.PORT || 4000;
const router = require("./router");

const localhost = (process.env.LOCALHOST = "localhost");
http.createServer(router).listen(port, () => {
  console.log(`server is running on http://${localhost}:${port}`);
});

