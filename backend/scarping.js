const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // شوف العمليات
    const page = await browser.newPage();

    const baseURL = 'https://witanime.world/%D9%82%D8%A7%D8%A6%D9%85%D8%A9-%D8%A7%D9%84%D8%A7%D9%86%D9%85%D9%8A/';

    await page.goto(baseURL, { waitUntil: 'networkidle2' });

    // خذ روابط كل الأنميات في الصفحة الحالية
    const animeLinks = await page.evaluate(() => {
        let links = [];
        document.querySelectorAll('.manga_title a').forEach(a => {
            links.push(a.href);
        });
        return links;
    });

    let allData = [];

    for (let animeLink of animeLinks) {
        await page.goto(animeLink, { waitUntil: 'networkidle2' });

        // خذ روابط كل الحلقات
        const episodeLinks = await page.evaluate(() => {
            let eps = [];
            document.querySelectorAll('.episode-list a').forEach(a => {
                eps.push({ title: a.innerText, url: a.href });
            });
            return eps;
        });

        for (let ep of episodeLinks) {
            await page.goto(ep.url, { waitUntil: 'networkidle2' });

            // امسح الإعلانات
            await page.evaluate(() => {
                document.querySelectorAll("a[id^='lk']").forEach(ad => ad.remove());
            });

            // جلب السيرفرات
            const servers = await page.evaluate(() => {
                let arr = [];
                document.querySelectorAll('.server-link').forEach(s => {
                    arr.push(s.innerText.trim());
                });
                return arr;
            });

            allData.push({
                anime: animeLink,
                episode: ep.title,
                episodeLink: ep.url,
                servers: servers
            });
        }
    }

    console.log(JSON.stringify(allData, null, 2));
    await browser.close();
})();
