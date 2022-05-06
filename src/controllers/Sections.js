const { insert, modify ,list, remove } = require('../services/Projects');
const httpStatus = require('http-status');


const index = (req, res) => {
    return res.status(httpStatus.OK).json({
        message: 'Welcome to the section'
    });
  /* list()
        .then(result => {
            res.status(httpStatus.OK).send(result)
        }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }); */
};

const create = (req, res) => {
  req.body.user_id = req.user
  insert(req.body)
      .then(result => {
      res.status(httpStatus.CREATED).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });

 };

const update = (req, res) => {
   if(req.params?._id){
      return  res.status(httpStatus.BAD_REQUEST).send({message: 'ID bilgisi gerekli'});
   }
       modify(req.body, req.params?.id).then(updatedProject => {
        res.status(httpStatus.OK).send(updatedProject);
      }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
       });
 };

const deleteSection = (req, res) => {
    if(req.params?._id){
        return  res.status(httpStatus.BAD_REQUEST).send({message: 'ID bilgisi gerekli'});
    }
    remove(req.params?.id).then(deletedItem => {
        if (!deletedItem){
            return  res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunmamaktadır'});
        }
        res.status(httpStatus.OK).send({
            message: 'Kayıt başarıyla silindi',
        });
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Silme işlemi sırasında bir problem oluştu"});
    });

}

module.exports = {
    create,
    index,
    update,
    deleteSection
 };