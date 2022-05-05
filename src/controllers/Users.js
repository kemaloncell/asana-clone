const { insert, list, loginUser, modify } = require('../services/Users');
const projectService = require('../services/Projects');
const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');


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
    console.log(new_password,'salt ');
    modify({email: req.body.email}, { password: passwordToHash(new_password) }).then(updatedUser => {
        console.log(updatedUser, "updatedUser");
        console.log(updatedUser.password, "updatedUser.password");
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

module.exports = {
    create,
    index,
    login,
    projectList,
    resetPassword
 };