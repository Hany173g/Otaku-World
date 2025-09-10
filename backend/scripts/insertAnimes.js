const { episode, server, session, complaint, User } = require('../models/relations');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sequelize = require('../config/database'); // لو عندك ملف database.js للاتصال

// IIFE async عشان نقدر نستخدم await
(async function addAnimes() {
    try {
        await sequelize.authenticate();
        console.log('Connection To database');

        // قراءة JSON
        const rawData = fs.readFileSync(path.join(__dirname, '../anime_links.json'), 'utf-8');
        const data = JSON.parse(rawData);
        const entries = Object.entries(data);

        const sessionName = 'Lord of Mysteries (Guimi Zhi Zhu: Xiaochou Pian)';
        let findSession = await session.findOne({ where: { sessionName } });

        // لو مش موجود، نعمله
        if (!findSession) {
    findSession = await session.create({
        sessionName,
        description: "القصة تتحدث عن كلاين موريتي شاب يجد نفسه في عالم غريب...",
        countEpisode: entries.length,
        categories: JSON.stringify(["action", "adventure", "shounen"]),
        Image: "https://witanime.world/wp-content/uploads/2025/06/Lord-of-Mysteries-scaled-413x559.jpg"
    });
}


        for (let i = 0; i < entries.length; i++) {
            const [episodeName, servers] = entries[i];

            const newEpisode = await findSession.createEpisode({
                numberEpisode: i + 1,
                Image: "https://witanime.world/wp-content/uploads/2025/06/Lord-of-Mysteries-scaled-413x559.jpg"
            });

            for (const [serverName, videoUrl] of Object.entries(servers)) {
                await newEpisode.createServer({ serverName, videoUrl });
            }
        }

        console.log('All episodes inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error inserting episodes:', err);
        process.exit(1);
    }
})();
