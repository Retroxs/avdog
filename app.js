const TelegramBot = require('node-telegram-bot-api');
const r2 = require('r2')
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.avdog_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/av (.+)/, async (msg,match) => {
    const chatId = msg.chat.id;
    let av = await r2(`https://api.avgle.com/v1/video/${match[1]}`).json
    if(av.success){
    let video = av.response.video
      bot.sendMessage(chatId,video.video_url)
    }else{
      bot.sendMessage(chatId,"未找到相应资源")
    }
});
