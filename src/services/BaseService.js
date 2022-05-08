class BaseService {
    constructor(model) {
        console.log(model,'BaseService constructor');
    }
getService() {
    console.log('BaseService.getService2');
}
}

module.exports = BaseService