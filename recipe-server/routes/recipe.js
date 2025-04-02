var express = require('express');
var router = express.Router();

import { getRecipe } from '../src/apis';

/* GET users listing. */
router.get('/getRecipe', async function(req, res, next) {

  var ingredient = req.query.ingredient;
  var callbackString = req.query.myCallback;

  let result;
  try{
    result = await getRecipe(ingredient);
  }
  catch(e){
    console.log(e);
    
    try{
      result = await getRecipe(ingredient);
    }
    catch(ee){
      console.log(ee);
    }
  }

  console.log(result)

  return res.send(`${callbackString}(${JSON.stringify(result)})`);
  // return res.json(rows);
});

module.exports = router;
