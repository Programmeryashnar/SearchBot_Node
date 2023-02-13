require('dotenv').config();
const { Telegraf }=require('telegraf');
const axios=require('axios');

const bot =new Telegraf(process.env.TOKEN);
//pixabay's api key
const apikey=process.env.PIXABAYAPI;
module.exports=(bot)=>{

    const config = require('../../config');
//handler for /start and /help command

bot.command(['start', 'help'],ctx=>{
    //message
    ctx.reply("Hello! " +ctx.from.first_name);
    let message=config.helpMessage;
    //ctx.reply(text,[extra params]);
    ctx.reply(message,{
        reply_markup:{
            inline_keyboard:[
            [    //Use switch inline query current chat to pre-type "@"
                {text:'Search Photo', switch_inline_query_current_chat:'p'}
            ],
            [
                {
                    text:'Search Information', switch_inline_query_current_chat:'w'
                }
            ]
            ]
        }
    })
})

}
