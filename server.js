const express = require("express");
const next = require("next");
const compression = require("compression");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use gzip compression for assets
  server.use(compression());

  // Set cache headers for static assets (e.g., JS, CSS, images)
  server.get("/_next/*", (req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    next();
  });

  // Handle other requests using Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.use(express.static(__dirname + "/public", { maxAge: "365d" }));
  server.use(function (req, res, next) {
    if (req.url.match(".js|.css|.woff|.jpg|.png|.gif|.ttf")) {
      res.setHeader("Cache-Control", "public,max-age=31536000"); // 365 days
    }
    next();
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
