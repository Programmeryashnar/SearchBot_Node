require('dotenv').config();
const { Telegraf }=require('telegraf');
const axios=require('axios');

const bot =new Telegraf(process.env.TOKEN);
//pixabay's api key
const apikey=process.env.PIXABAYAPI;
module.exports=(bot)=>{
    bot.inlineQuery(/w\s.+/, async ctx=>{
        let input=ctx.inlineQuery.query.split(' ');
        input.shift();
        let query=input.join(' ');

        let res=await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`)
        let data=res.data;
        let allTitles=data[1];
        let allLinks=data[3];

        if(allTitles==undefined){
            return;

        }
        let results =allTitles.map((item, index)=>{
            return{
                type:'article',
                id:String(index),
                title:item,
                input_message_content:{
                    message_text:`${item}\n${allLinks[index]}`
                },
                description:allLinks[index],
                reply_markup:{
                    inline_keyboard:[
                        [
                            {
                                text:`Share this about ${item}`, switch_inline_query:`w ${item}`
                            }
                        ],

                    ]
                }
            }
        })
        ctx.answerInlineQuery(results);
        
    })
}