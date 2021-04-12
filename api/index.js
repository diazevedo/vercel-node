module.exports = (req, res) => {
  const name = req.body.name || "stranger";
  res.status(200).send(`from the body your name is ${name}`);
};
