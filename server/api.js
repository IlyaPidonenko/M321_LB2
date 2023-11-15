const hello = (req, res) => {
  res.send("Hello World!");
};

const initializeAPI = (app) => {
  // default REST api endpoint
  app.get("/api/hello", hello);
};

module.exports = { initializeAPI };
