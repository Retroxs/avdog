const r2 = require("r2");
const cheerio = require("cheerio");

function getTorrentUrl(kw){
    return `https://torrents.me/s/${kw}:torrentseeker`
}
function getUrl(kw) {
  return "http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=" + kw;
}

async function getHtml(kw) {
  const url = getUrl(kw);
  let html = await r2(url).text;
  return html;
}

function parseHtml(context) {
  const $ = cheerio.load(context);
  let _title = $("title").text();
  let title = _title.split(" -")[0];
  let cover = "http:" + $("#video_jacket_img").attr("src");
  return { title, cover };
}

async function getInfo(kw) {
  let html = await getHtml(kw);
  let info = parseHtml(html);
  let torretUrl = getTorrentUrl(kw)
  return {...info,torretUrl};
}

module.exports = getInfo;
