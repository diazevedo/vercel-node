module.exports = (req, res) => {
  const name = req.query.name || "stranger";
  console.log(req);
  res.status(200).send(`Hello, ${JSON.stringify(req)}!`);
};
