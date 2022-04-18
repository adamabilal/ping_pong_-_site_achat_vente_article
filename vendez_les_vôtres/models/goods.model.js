const mongoose = require('mongoose');

// definition of schema for goodss
const goodsSchema = new mongoose.Schema({
  description : {
            type : String,
            required : true              // a description must be given
          },
  price :{
    type : Number,
    required : true  
  },
});
// export the schema
module.exports = goodsSchema;

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/db.controller');
const goods = dbConnection.model('goods',goodsSchema,'goods');

// export the model
module.exports.model = goods;
