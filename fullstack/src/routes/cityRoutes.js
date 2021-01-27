var express = require('express');
var cityRouter = express.Router();
var city = [
    {
      "_id": 1,
      "city_name": "Delhi",
      "city": 1,
      "country_name": "India"
    },
    {
      "_id": 3,
      "city_name": "Pune",
      "city": 3,
      "country_name": "India"
    },
    {
      "_id": 2,
      "city_name": "Mumbai",
      "city": 2,
      "country_name": "India"
    },
    {
      "_id": 4,
      "city_name": "Chandigarh",
      "city": 4,
      "country_name": "India"
    },
    {
      "_id": 5,
      "city_name": "Goa",
      "city": 5,
      "country_name": "India"
    },
    {
      "_id": 6,
      "city_name": "Manali",
      "city": 6,
      "country_name": "India"
    }
  ]

function router(menu){
  cityRouter.route('/')
    .get((req,res) =>{
      //res.send(city)
      res.render('city',{title:'City Page',data:city,menu:menu})
  })

  cityRouter.route('/details/:id')
    .get((req,res) =>{
      var id = req.params.id;
      var name = req.query.city?req.query.city:'Delhi';
      res.send(`${name} Details for ${id}`)
  })

  return cityRouter;
}

module.exports = router;