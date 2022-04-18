const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.redirect('/sellyoursapp.html');

module.exports.me =
  async (req, res) =>  {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.userId);
    res.status(200).json({ name : user.name });
  }

module.exports.update =
  async (req,res) => {
    const updatedData = { ...req.body };
    console.log(updatedData);
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
  }



  const Goods = require('../models/goods.model').model;

  const allGoods =                                  
    async (req,res) => {
          const allGoods = await Goods.find();
          res.status(200).json(allGoods);
      }
  
  const getGood =                                  
    async (req,res) => {
      const Good = await Goods.findById( req.params.goodId );
      res.status(200).json(Good);
    }
  
  const createGood =                                
    async (req,res) => {
      const newGoodData = { ...req.body };
      const newGood = await Goods.create(newGoodData);
      res.status(201).json(newGood);
    }
  
  const updateGood =                                 
    async (req, res) => {
      const updatedGoodData = { ...req.body };
      const updatedGood = await Goods.findByIdAndUpdate(
                                                         req.params.goodId,
                                                         updatedGoodData,
                                                         { new : true }
                                                       );
      res.status(201).json(updatedGood);
    }
  
  const deleteGood =                                 
    async (req,res) => {
        await Goods.findByIdAndRemove( req.params.GoodId );
        res.status(200).json(null);
     }
  
  module.exports.allGoods = allGoods;
  module.exports.getGood = getGood;
  module.exports.createGood = createGood;
  module.exports.updateGood = updateGood;
  module.exports.deleteGood = deleteGood;
  