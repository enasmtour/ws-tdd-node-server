const router = (request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("Hello");
  } else if (request.url === "/elephants") {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("Unknown uri");
  } else if (request.url === "/blog") {
    if (request.method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      const arr = ["one", "two", "three"];
      const convrtArr = JSON.stringify(arr);
      response.end(convrtArr);
    } else if (
      request.method === "POST" &&
      request.headers.password == "potato"
    ) {
      var body = "";
      request.on("data", function(data) {
        body += data;
      });
      request.on("end", () => {
        if (body !== "") {
          response.writeHead(200, { "Content-Type": "application/json" });

          response.end(body);
        } else {
          response.writeHead(302, { Location: "/blog" });
          response.end();
        }
      });
    }
     else if (request.method === "POST" && request.headers === undefined) {
   {
      response.writeHead(403, { "Content-Type": "text/html" });
      response.end("Forbidden");
    }
  }
  }
};

module.exports = router;
