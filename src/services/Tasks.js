//model ile ara bir katman
const Task = require('../models/Tasks');

const insert = (sectionData) => {
    // Project için projectten yeni üretti
  const task = new Task(sectionData);
  return task.save();
};

const list = (where) => {
  return Task.find(where || {}).populate({
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
    return Task.findByIdAndUpdate(id, data, {new:true});
}

const remove = (id) => {
    return Task.findByIdAndDelete(id,);
}

module.exports = {
    insert,
    modify,
    list,
    remove
}