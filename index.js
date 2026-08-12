const http = require('http');
http.createServer((req, res) => {
  res.write("Bot 2 aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
  host: 'mc.muzcraft.com',
  username: 'JENNIE',
  version: '1.12.2',
  hideErrors: true
});

// CHUNK YAZILARINI SUSTURAN GÜVENLİ YOL
bot.on('kicked', console.log)
bot.on('error', console.log)

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

setInterval(() => {
  if (bot.entity) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }
}, 15000);

bot.on('end', () => setTimeout(() => process.exit(), 5000));

