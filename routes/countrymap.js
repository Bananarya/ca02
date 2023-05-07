//   const countryName = req.params.name;
//   try {
//     const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
//     const countryData = response.data[0];
//     const { name, flag, capital, population } = countryData;
//     res.render('country', { name, flag, capital, population });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching country data');
//   }

// const baseUrl = 'https://rest-country-api.p.rapidapi.com';
    // const endpoint = '/v2/name';
    // const url = `${baseUrl}${endpoint}/${req.body.country}`;
    
    // const headers = {
    //     'X-RapidAPI-Key': '0da32b5d94msh3eff559f1ae4f1bp1ef4adjsnf748d925043f',
    //     'X-RapidAPI-Host': 'rest-country-api.p.rapidapi.com',
    //     'Content-Type': 'application/json'
    //   };
    // const data = req.body.country;

    const axios = require('axios');
    const express = require('express');
    const countryModel = require('../models/countryModel');
    const router = express.Router();
    const bodyParser = require('body-parser');
    
    router.use(bodyParser.urlencoded({extended: false}));
    
    isLoggedIn = (req,res,next) => {
        if (res.locals.loggedIn) {
            next()
        } else {
            res.redirect('/login')
        }
      }
    
    router.get('/countrymap', isLoggedIn, async (req, res) => {
        countryModel.findOne().sort({date:-1}).then(function(doc){
        res.render('countrymap', {dialogue : doc});
      })
    });
    
    
    router.post('/countrymap', isLoggedIn,
      async (req,res,) => {
    
        const options = {
            method: 'GET',
            url: 'https://rest-country-api.p.rapidapi.com/',
            headers: {
              'X-RapidAPI-Key': 'd6e5de619amsheadf7de575dc51dp10ed25jsn929e4a3e52a6',
              'X-RapidAPI-Host': 'rest-country-api.p.rapidapi.com'
            }
          };
    
        const countryName = req.body.country;
    
        try{
            console.log('submitted country: ', countryName)
            const response = await axios.request(options);
            const countryData = response.data;
            const filteredCountry = countryData.filter(country => country.name.common === countryName)
            console.log(filteredCountry[0].name.official)
    
            const officialName = filteredCountry[0].name.official
            const maps = filteredCountry[0].maps
    
            const model = new countryModel({
                date: new Date(),
                CountryName: officialName,
                maps:maps
            });
            await model.save();
            res.redirect('/countrymap')
        }catch(error){
            console.error(error);
        }
      }
    )
    
    module.exports = router;
    
