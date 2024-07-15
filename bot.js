const { default: axios } = require("axios");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Replace 'YOUR_BOT_TOKEN' with the token you got from BotFather
const token = process.env.BOT_FATHER;
const bot = new TelegramBot(token, { polling: true });

const ChatId = process.env.Chat_Id;

// Listen for any kind of message. There are different kinds of messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Send a response back to the user
  bot.sendMessage(chatId, `You said: ${messageText}`);
});

// Additional commands can be added here
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome to my bot! Type /news to get latest news");
});

bot.onText(/\/news/, async (msg) => {
  const News = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
      process.env.NEWS_APIKEY,
  );

  const articles = News.data.articles;

  const chatId = msg.chat.id;

  const length = articles.length;

  for (let i = 0; i < length; i++) {
    const ans = `
    <b>${articles[i].title}</b>

    ${articles[i].description}

    ReadMore:${articles[i].url}


    ${new Date(articles[i].publishedAt).toLocaleString()}
    `;
    bot.sendMessage(chatId, ans, { parse_mode: "HTML" });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});

async function fetchNews(yourId) {
  const News = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
      process.env.NEWS_APIKEY,
  );

  const articles = News.data.articles;

  const length = articles.length;

  for (let i = 0; i < length; i++) {
    const ans = `
    <b>${articles[i].title}</b>

    ${articles[i].description}

    ReadMore:${articles[i].url}


    ${new Date(articles[i].publishedAt).toLocaleString()}
    `;
    bot.sendMessage(yourId, ans, { parse_mode: "HTML" });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
fetchNews(ChatId);
setInterval(async () => {
  await fetchNews(ChatId);
}, 86400000);

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Type /news to get latest update");
});

bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "I am a simple Telegram bot for your latest news.");
});
