var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chat:1111@cluster0-ogzht.mongodb.net/Bursa?retryWrites=true&w=majority',{useNewUrlParser:true},()=>{
    console.log('Db connect');
});
var Schem = mongoose.Schema;
var DbSchem = new Schem({
para:String,
    cabinet:String,
    teacher:String,
    key:String,
    number:String
});
var DbModel = mongoose.model('parus',DbSchem);
module.exports = DbModel;