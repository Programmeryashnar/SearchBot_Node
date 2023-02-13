require('dotenv').config();
const { Telegraf }=require('telegraf');
const axios=require('axios');

const bot =new Telegraf(process.env.TOKEN);
//pixabay's api key
const apikey=process.env.PIXABAYAPI;

module.exports=(bot)=>{
    bot.inlineQuery(/p\s.+/, async ctx=>{
        let input = ctx.inlineQuery.query.split(' ');
        input.shift();
        let query=input.join(' ');
    
        let res=await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
        let data=res.data.hits;
    
        let results=data.map((item,index)=>{
            return{
                type:'photo',
                id:String(index),
                photo_url:item.webformatURL,
                thumb_url:item.previewURL,
                photo_height:200,
                photo_width:300,
                caption:`[Source](${item.webformatURL})\n[Large Image](${item.largeImage})`,
                parse_mode:'Markdown',
                reply_markup:{
                    inline_keyboard:[
                        [
                            {
                                text:"Share Photo", switch_inline_query:`p ${item}`
                            }
                        ],

                    ]
                }
            }
        })
        ctx.answerInlineQuery(results)
    })
       
}
bot.inlineQuery(/p\s.+/, async ctx=>{
    let input = ctx.inlineQuery.query.split(' ');
    input.shift();
    let query=input.join(' ');

    let res=await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
    let data=res.data.hits;

    let results=data.map((item,index)=>{
        return{
            type:'photo',
            id:String(index),
            photo_url:item.webformatURL,
            thumb_url:item.previewURL,
            photo_width:300,
            photo_height:200,
            caption:`[Source](${item.webformatURL})\n[Large Image](${item.largeImage})`,
            parse_mode:'Markdown'
        }
    })
    ctx.answerInlineQuery(results)
})
