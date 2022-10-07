const React = require("react");
const ReactDOMServer = require("react-dom/server");
const ssrPrepass = require("react-ssr-prepass");
const express = require("express");
const app = express();
const port = 3000;

const App = () => {
  console.log("render App");
  throw new Error("something is wrong");
  return React.createElement("div", null, "hello world");
};

app.get("/", async (req, res) => {
  console.log("start prepass");
  await ssrPrepass(App());
  console.log("done prepass");
  res.send(ReactDOMServer.renderToString(App()));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
