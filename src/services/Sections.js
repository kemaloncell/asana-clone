//model ile ara bir katman
const Section = require('../models/Sections');

const insert = (sectionData) => {
    // Project için projectten yeni üretti
  const section = new Section(sectionData);
  return section.save();
};

const list = (where) => {
  return Section.find(where || {}).populate({
      // path => user_id isimli field'nı doldurmak istiyorum
      path:'user_id',
      // seçtiğim sütunlar gelsin
      select:'full_name, email, profile_image',
  }).populate({
      path:'project_id',
      select:'name',
  })
};

const modify = (data, id) => {
    /*return Project.findById(id).then(project => {
        project.name = data?.name;
        return project.save();
    }).catch(err => {
        console.log(err);
    });*/
    // bunun yerine tek satırda yapıyoruz
    return Section.findByIdAndUpdate(id, data, {new:true});
}

const remove = (id) => {
    return Section.findByIdAndDelete(id,);
}

module.exports = {
    insert,
    modify,
    list,
    remove
}