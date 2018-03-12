const r2 = require("r2");
const cheerio = require("cheerio");

function getUrl(kw) {
  return "https://torrents.me/s/"+kw+":torrentseeker";
}

async function getHtml(kw) {
  const url = getUrl(kw);
  let html = await r2(url).text;
  return html;
}

function parseHtml(context) {
  const $ = cheerio.load(context);
  return $
//   return $(".gsc-thumbnail-inside a").text()
}


//TODO: download torrnet
async function getInfo(kw) {
  let html = await getHtml(kw);
  let info = parseHtml(html) 
  console.log(info.html()) 
}

getInfo("AMBI-048")
