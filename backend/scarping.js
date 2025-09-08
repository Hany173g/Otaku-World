const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeEpisode(url) {
  try {
    // 1. هنجلب صفحة الحلقة
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // 2. نجيب روابط السيرفرات
    let servers = [];
    $(".download-links a, .watch-btn a, iframe").each((i, el) => {
      let link = $(el).attr("href") || $(el).attr("src");
      if (link && (link.includes("ok.ru") || link.includes("mp4upload") || link.includes("dood"))) {
        servers.push(link);
      }
    });

    return servers;
  } catch (err) {
    console.error("خطأ:", err.message);
    return [];
  }
}

// مثال تشغيل
(async () => {
  const links = await scrapeEpisode("https://witanime.world/episode/one-piece-%d8%a7%d9%84%d8%ad%d9%84%d9%82%d8%a9-1/");
  console.log("لينكات السيرفرات:", links);
})();
