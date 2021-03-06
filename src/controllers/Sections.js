const { insert, modify ,list, remove } = require('../services/Sections');
const httpStatus = require('http-status');


const index = (req, res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Proje bilgisi gereklidir' });
   list({project_id : req.params.projectId})
        .then(result => {
            res.status(httpStatus.OK).send(result)
        }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
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
       modify(req.body, req.params?.id).then(updatedDoc => {
        res.status(httpStatus.OK).send(updatedDoc);
      }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
       });
 };

const deleteSection = (req, res) => {
    if(req.params?._id){
        return  res.status(httpStatus.BAD_REQUEST).send({message: 'ID bilgisi gerekli'});
    }
    remove(req.params?.id).then(deletedDoc => {
        if (!deletedDoc){
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