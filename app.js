const TelegramBot = require("node-telegram-bot-api");
const r2 = require("r2");
const utils = require("./utils");
const time_range = utils.time_range;
const getInfo = require("./utils/search");
// Create a bot that uses 'polling' to fetch new updates
const token = process.env.avdog_token;
const bot = new TelegramBot(token, { polling: true });

async function handleAv(msg, match) {
  let chatId = msg.chat.id;
  let NSFW = time_range(9, 12) || time_range(17, 18);
  if (NSFW) {
    let dailyverse = await r2("http://dailyverse-qoli.appspot.com").text;
    bot.sendMessage(
      chatId,
      `工作时间(上午:9-12,下午:14-18)禁止开车:\n${dailyverse.trim()}`
    );
  } else {
    // let av = await r2(`https://api.avgle.com/v1/video/${match[1]}`).json
    // if (av.success) {
    //   let video = av.response.video
    //   bot.sendMessage(chatId, video.video_url)
    // } else {
    //   bot.sendMessage(chatId, "未找到相应资源,请尝试新车牌")
    // }
    try {
      let av = await getInfo(match[1]);
      if (!/http/.test(av.cover)) {
        bot.sendMessage(chatId, "未找到相应资源,请尝试新车牌");
      } else {
        bot.sendPhoto(msg.chat.id, av.cover, {
          caption: `title:${av.title}\ntorrentUrl:${av.torretUrl}`
        });
      }
    } catch (e) {
      bot.sendMessage(chatId, "出了点小意外呢");
    }
  }
}

bot.onText(/\/av (.+)/, handleAv);
