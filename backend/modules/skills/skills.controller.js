const skills = require("./skills.data");

exports.getAllSkills = (req, res) => {
  res.json(skills);
};