const TelegramBot = require('node-telegram-bot-api');
const r2 = require('r2')
const utils = require("./utils");
const time_range = utils.time_range
// Create a bot that uses 'polling' to fetch new updates
const token = process.env.avdog_token;
const bot = new TelegramBot(token, { polling: true });
const NSFW = (time_range(9,11) || time_range(14,23));

async function handleAv(msg, match) {
  const chatId = msg.chat.id;
  if (NSFW) {
    let dailyverse = await r2('http://dailyverse-qoli.appspot.com').text
    bot.sendMessage(chatId, dailyverse)
  } else {
    let av = await r2(`https://api.avgle.com/v1/video/${match[1]}`).html
    if (av.success) {
      let video = av.response.video
      bot.sendMessage(chatId, video.video_url)
    } else {
      bot.sendMessage(chatId, "未找到相应资源")
    }
  }
}

bot.onText(/\/av (.+)/, handleAv);
