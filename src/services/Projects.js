//model ile ara bir katman
const Project = require('../models/Projects');

const insert = (projectData) => {
    // Project içine ekledi yeni üretti
  const project = new Project(projectData);
  return project.save();
};

const list = () => {
  return Project.find({});
};

module.exports = {
    insert,
    list
}