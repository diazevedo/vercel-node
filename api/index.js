module.exports = (req, res) => {
  if (req.method === "POST")
    res.status(200).json({ message: "eh post", name: req.body.name });
  else res.status(200).json({ message: "outra coisa" });
};
