module.exports = (req, res) => {
  const name = req.query.name || "stranger";
  console.log(req.body.file.name);
  res.status(200).json(req);
};
