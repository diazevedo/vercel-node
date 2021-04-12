module.exports = (req, res) => {
  const { name } = req.body;
  res.status(200).send(`from the body your name is ${name}`);
};
