var mongoose = require('mongoose'),
    mongoosastic=require('mongoosastic'),
    Schema = mongoose.Schema;

//(function(done){
    mongoose.connect('mongodb://localhost:27017/dog',  { useNewUrlParser: true });
    mongoose.connection.once('open',function(){
        console.log('Connection has been made');
        //done();
    }).on('error',function(error){
        console.log('Connection error',error);
    });

//});

// Create a Schema and a Model

var SuppliesSchema = new Schema({
    imagepath: { type: String, es_indexed:true },
    Title: { type: String, es_indexed:true },
    Price: { type: String, es_indexed:true }
});

SuppliesSchema.plugin(mongoosastic);

var supplies = mongoose.model('Supplies', SuppliesSchema)
    , stream = supplies.synchronize()
    , count = 0;

supplies.createMapping(function(err, mapping){
    if(err){
        console.log('error creating mapping (you can safely ignore this)');
        console.log(err);
    }else{
        console.log('mapping created!');
        console.log(mapping);
    }
});


module.exports = supplies;