//model ile ara bir katman
const Project = require('../models/Projects');

const insert = (projectData) => {
    // Project için projectten yeni üretti
  const project = new Project(projectData);
  return project.save();
};

const list = (where) => {
  return Project.find(where || {}).populate({
      // path => user_id isimli field'nı doldurmak istiyorum
      path:'user_id',
      // seçtiğim sütunlar gelsin
      select:'full_name, email'
  });
};

const modify = (data, id) => {
    /*return Project.findById(id).then(project => {
        project.name = data?.name;
        return project.save();
    }).catch(err => {
        console.log(err);
    });*/
    // bunun yerine tek satırda yapıyoruz
    return Project.findByIdAndUpdate(id, data, {new:true});
}

module.exports = {
    insert,
    modify,
    list
}