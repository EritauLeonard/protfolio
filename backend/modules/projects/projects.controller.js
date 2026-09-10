const projects = require("./projects.data");

exports.getAllProjects = (req, res) => {
  const { featured } = req.query;

  if (featured === "true") {
    return res.json(projects.filter((p) => p.featured));
  }

  res.json(projects);
};

exports.getProjectById = (req, res) => {
  const project = projects.find((p) => p.id === parseInt(req.params.id));

  if (!project) {
    return res.status(404).json({ error: "Projet introuvable." });
  }

  res.json(project);
};