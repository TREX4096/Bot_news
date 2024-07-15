
## Description

This is a simple Telegram bot that provides users with the latest news updates.

## Features

- Fetches news articles from a specified API.
- Sends the latest articles to users on request.
- Notifies users about new articles automatically.

## Installation

1. ### Clone the repository:
   ```bash
   git clone https://github.com/TREX4096/Bot_news
   cd Bot_news
   npm i



2. ### Get API keys:
   1.Go to @BotFather on Telegram to create a new bot and obtain your bot token. \
   2.Visit News API to get your news API key. Visit [here]( https://newsapi.org/account) to get a news api key

3. ### Create a new env file and replace it with your api keys
   ```bash
   touch .env
   cp .env.example .env


4. ### run the bot
   ```bash
   node bot.js
