const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
// const { isLoggedIn } = require('./pwauth');
const chatGPTModel = require('../models/chatGPTmodel');

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
      next()
  } else {
      res.redirect('/login')
  }
}

router.get('/diet', isLoggedIn, async (req,res,)=> {
    // res.render('diet')
    chatGPTModel.findOne().sort({date:-1}).then(function(doc){
      res.render('diet', {dialogue : doc});
    })
})

router.post('/diet', isLoggedIn,
  async (req,res,) =>{
    console.log(" I a trying to adding ")
    const question = "give me a recipe for " + req.body.meal + "at this time " + req.body.time;
    const suggestion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
    });
    const model = new chatGPTModel({
      date: new Date(),
      question: question,
      answer:suggestion.date.choices[0].text.trim(),
    });
    await model.save();
    console.log(" I have finished adding ")
    res.redirect('/diet')
  }
)

module.exports = router;
