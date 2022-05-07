const { insert, modify ,list, remove, findOne } = require('../services/Tasks');
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

const deleteTask = (req, res) => {
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

const makeComment = (req, res) => {
    findOne({_id: req.params.id}).then(mainTask => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunmamaktadır'});
    const comment = {
        ...req.body,
        commented_at : new Date(),
        user_id : req.user
    }
    mainTask.comments.push(comment);
    mainTask.save().then(updatedDoc => {
       return res.status(httpStatus.OK).send(updatedDoc);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
    });
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
    });
}

const deleteComment = (req,res) => {
    findOne({_id: req.params.id}).then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunmamaktadır'});
        mainTask.comments = mainTask.comments.filter(comment => comment._id?.toString() !== req.params.commentId);
        mainTask.save().then(updatedDoc => {
            return res.status(httpStatus.OK).send(updatedDoc);
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
        });
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
    });
}

const addSubTask = (req, res) => {
     // 1 MAİN TASK ÇEKİLİR
     if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({message: 'ID bilgisi gerekli'});
     findOne({_id: req.params.id}).then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunmamaktadır'});
         // 2 SUB TASK EKLENİR
         insert({...req.body, user_id:req.user})
             .then(subTask => {
                 // 3 SUB TASKIN REFERANSI MAİN TASK ÜZERİNDEn GÖSTERİLİR UPDATE EDİLİR
                 mainTask.sub_tasks.push(subTask);
                 mainTask.save().then(updatedDoc => {
                     // 4 KULLANICIYA YENİ DÖKÜMAN GÖNDERİLİR
                     return res.status(httpStatus.OK).send(updatedDoc);
                 }).catch(err => {
                     res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
                 });
             }).catch(err => {
             res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
         });
     }).catch(err => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu"});
     });
 }

 const fetchTask = (req, res) => {
     findOne({_id: req.params.id}, true).then(task => {
         if (!task) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunmamaktadır'});
         return res.status(httpStatus.OK).send(task);
     }).catch(err => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
     });
 }

module.exports = {
    create,
    index,
    update,
    deleteTask,
    makeComment,
    deleteComment,
    addSubTask,
    fetchTask
 };