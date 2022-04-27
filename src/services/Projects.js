const Project = require('../models/Projects');

const insert = (projectData) => {
    // Project içine ekledi yeni üretti
  const project = new Project(projectData);
  return project.save();
};

module.exports = {
    insert
}