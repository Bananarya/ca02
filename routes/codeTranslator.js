const axios = require('axios');
const express = require('express');
const GPTModel = require('../models/GPTModel');
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

router.get('/codeTranslator', isLoggedIn, async (req, res) => {
    GPTModel.findOne().sort({date:-1}).then(function(doc){
    res.render('codeTranslator', {dialogue : doc});
    })
});


router.post('/codeTranslator', isLoggedIn,
    async (req,res,) => { 

        const question = "Translate the code below into " + req.body.Lang + " code \n\n" + req.body.code + "\n\n";
    
        const options = {
            method: 'POST',
            url: 'https://openai80.p.rapidapi.com/chat/completions',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '163aa16876msh80504b7f0080799p1a1f35jsn2ad5e7b09da2',
              'X-RapidAPI-Host': 'openai80.p.rapidapi.com', 
              "Accept-Encoding": "gzip,deflate,compress"
            },
            data: {
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'user',
                  content: question
                }
              ]
            }   
          };
        

    try{
        const response = await axios.request(options);
        console.log('submitted quesiton: ', question)
        console.log("response: ", response.data.choices[0].message.content)


            


        const model = new GPTModel({
            date: new Date(),    
            Question: question,
            Response: response.data.choices[0].message.content,
        });
        await model.save();

        res.redirect('/codeTranslator')


    }catch(error){
        console.error(error);
    }
    }
)

module.exports = router;
