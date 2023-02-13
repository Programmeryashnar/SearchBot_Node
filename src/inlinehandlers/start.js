require('dotenv').config();
const { Telegraf }=require('telegraf');
const axios=require('axios');

const bot =new Telegraf(process.env.TOKEN);
//pixabay's api key
const apikey=process.env.PIXABAYAPI;
module.exports=(bot)=>{
    
    const config = require('../../config');

bot.inlineQuery(['start','help'],ctx=>{
    let message=config.helpMessage;
    let results=[
        {
            type:'article',
            id:'1',
            title:'Help Reference',
            input_message_content:{
                message_text: message
            },
            description:'Send help message on how to use the bot',
            reply_markup:{
                inline_keyboard:[
                    [
                        {
                            text:'Search Photo', switch_inline_query_current_chat:'p'
                        }
                    ],
                    [
                        {text:'Search Information', switch_inline_query_current_chat:'w'}
                    ]
                ]
            }
        }
    ]
    ctx.answerInlineQuery(results);
})
}