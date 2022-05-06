const { insert, list, loginUser, modify, remove } = require('../services/Users');
const projectService = require('../services/Projects');
const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const path = require('path');


const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
      .then(result => {
      res.status(httpStatus.CREATED).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });

 };

const login = (req,res) => {
    req.body.password = passwordToHash(req.body.password);
    loginUser(req.body)
        .then(user => {
            if(!user) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kullanıcı bulunamadı'});

            user = {
                ...user.toObject(),
                tokens:{
                   access_token : generateAccessToken(user),
                   refresh_token: generateRefreshToken(user)
                }
            }
            delete user.password;
            res.status(httpStatus.OK).send(user)
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
}

const index = (req, res) => {
    list()
      .then(result => {
      res.status(httpStatus.OK).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });
 };

const projectList = (req, res) => {
    projectService.list({user_id:req.user?._id})
        .then(projects => {
            res.status(httpStatus.OK).send(projects)
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error :"Projeler listelenirken bir hata oluştu"
            });
        });
}

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    modify({email: req.body.email}, { password: passwordToHash(new_password) }).then(updatedUser => {

    if(!updatedUser) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kullanıcı bulunamadı'});

        eventEmitter.emit('send_mail', {
            to: updatedUser.email,
            subject: "Şifre Sıfırlama ✔",
            html: "Talebiniz üzerine şifre sıfırlama işlemi gerçekleşti <br /> Giriş yaptıktan sonra şifrenizi değiştirinz <br/>" +
                `Yeni Şifreniz => <b>${new_password}</b>`,
        });

        res.status(httpStatus.OK).send({message: 'Şifre sıfırlama maili gönderildi'});
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "Şifre değiştirilirken bir hata oluştu"
        });
    });
}

const update = (req, res) => {
    modify({_id: req.user._id}, req.body).then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser);
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "Kullanıcı güncellenirken bir hata oluştu"
        });
    })
}

const changePassword = (req, res) => {
    // Uİ geldikten sonra şifre karşılaştırmaya ilişkin kurallar burada yer alacak
    req.body.password = passwordToHash(req.body.password);
    modify({_id: req.user._id}, req.body).then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser);
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "Kullanıcı güncellenirken bir hata oluştu"
        });
    })
}

const deleteUser = (req, res) => {
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

const updateProfileImage = (req, res) => {
    // 1 Resim kontrolü
   if(!req?.files?.profile_image){
       res.status(httpStatus.BAD_REQUEST).send({error: 'Bu işlem için yeterli veri yok!'});
   }
    // 2 upload işlemi
    const extension = path.extname(req.files.profile_image.name);
    const fileName = `${req?.user._id}${extension}`;
   const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
   req.files.profile_image.mv(folderPath, function (err) {
       if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: err });
       // 3 db save işlemi
       modify({_id: req.user._id}, {profile_image: fileName}).then(updatedUser => {
           res.status(httpStatus.OK).send(updatedUser);
       }).catch(() => {
           res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
               error: "Yükleme başaraılı fakat güncellenirken bir hata oluştu"
           });
       });
   // 4 responses

   });
}

module.exports = {
    create,
    index,
    login,
    projectList,
    resetPassword,
    changePassword,
    update,
    deleteUser,
    updateProfileImage,
 };