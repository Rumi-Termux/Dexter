const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot aktif!');
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} portunda aktif! Bot başlatılıyor...`);
  startBot();
});

function startBot() {
  const bot = mineflayer.createBot({
    host: 'mc.muzcraft.com',
    username: 'JENNIE',
    version: '1.12.2',
    hideErrors: true
  });

  bot.on('kicked', console.log);
  bot.on('error', console.log);

  bot.on('message', (msg) => {
    const m = msg.toString();
    console.log("SUNUCU: " + m);

    if (m.includes('/login') || m.includes('/gir')) {
      bot.chat('/login jeniekim');
    }

    if (m.includes('Başarıyla giriş yaptınız') || m.includes('Lobiye bağlandınız')) {
      setTimeout(() => bot.chat('/skyblock'), 5000);
    }

    if (m.includes('SkyBlock') && !m.includes('Sunucusuna bağlanıyorsunuz')) {
      setTimeout(() => bot.chat('/is go'), 10000);
    }
  });

  const jumpInterval = setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 15000);

  bot.on('end', () => {
    console.log("Bot düştü. Yeniden başlatılıyor...");
    clearInterval(jumpInterval);
    setTimeout(() => process.exit(1), 5000);
  });
}

process.on('uncaughtException', (err) => console.log('Hata:', err));
process.on('unhandledRejection', (err) => console.log('Hata:', err));
