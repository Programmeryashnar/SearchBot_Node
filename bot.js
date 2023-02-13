require('dotenv').config();
const { Telegraf }=require('telegraf');
const axios=require('axios');

const bot =new Telegraf(process.env.TOKEN);
//pixabay's api key
const apikey=process.env.PIXABAYAPI;

const startCommand=require('./src/commands/start');
startCommand(bot);
//=========
const startHandler=require('./src/inlinehandlers/start');
startHandler(bot);
//=======

const imageHandler=require('./src/inlinehandlers/image');
imageHandler(bot);
//======
const wikiHandler =require('./src/inlinehandlers/wiki');
wikiHandler(bot);
//=====




// bot.on('inline_query', async (ctx)=>{
//     let query=ctx.inlineQuery.query;
    
//     let res= await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
//      let data=res.data.hits;
//      console.log(data);
//      let results=data.map((item,index)=>{
//         return{
//             type:'photo',
//             id:String(index),
//             photo_url: item.webformatURL,
//             thumb_url: item.previewURL,
//             photo_width: 300,
//             photo_height:200

//         }
     
//      })
//      ctx.answerInlineQuery(results);


// })



bot.launch();
