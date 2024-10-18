const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('7867666406:AAG2ZmOg0PvxPVMtbF32wdDhpsWvQ_bjMdE', { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://pythondevbd.github.io/telegram_bot/'; // Your app's URL

    bot.sendMessage(chatId, 'Click below to open the app:', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Open Full Screen',
                        web_app: { url: webAppUrl }
                    }
                ]
            ]
        }
    });
});
