const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Projects');

const ProjectSchema = new Mongoose.Schema({
    name:String,
    /*user_id:{
        type:Mongoose.Types.ObjectId,
        ref:'User'
    },*/
},{
    timestamps:true,
    versionKey:false
}
);
/* istekten öncesi
ProjectSchema.pre('save',(next, doc)=>{
    console.log("öncesi",doc);
    next();
}); */

// isteden sonrası loglamaa...
ProjectSchema.post('save',(doc)=>{
    console.log("sonrası",doc);
    // save işleminde sonra bir log attırcaz
    logger.log({
        level:'info',
        message:doc
    })
});

module.exports = Mongoose.model('project',ProjectSchema);