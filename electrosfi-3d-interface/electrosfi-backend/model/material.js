const mongoose = require('mongoose');

module.exports = mongoose.model('Material', new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    refraction_index:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{ 
        type:String
    },
    reutilizable:{ //informar o usuário sobre a verificação do autor para a fonte -- o autor do material poderá ver a simulação
        type:Boolean,
        default:false
    },
    public:{
        type:Boolean,
        default:false
    },
    created_date:{
        type: Date,
        default:Date.now
    }
}));
