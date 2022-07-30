# Voice Controlled Discord Bot

This repository is for the 5th Hackathon of Documatic.
With that Project I am aiming to place `#1` and win 50€


# About

It is a voice controlled Discord Bot, means you (mainly) do not use prefix / Slash Commands, no! You will be using your VOICE.

Ofc. you somehow need to parse that audio, for that I am using https://wit.ai which is a free speech-to-text ai, which you need to train!
That means it might sometimes not return what you say... but I tested it over 19 months on another Project, and there it works 100% everytime, even multilangual now..

It is a Music Bot, as other interactions are not that optimal.

Currently it announces the songs via a MESSAGE, but I will change that ... (see todo)

# System-Requirements
- Idle Load: 17mb Ram
- High Load: 25-30mb Ram
- Highest Memory Load with HEAPS for 2 Days runtime: 97mb Ram
- 1 CORE
- Recommended: 250mb Ram
- nodejs v16.10

# How to use the Bot?
- *[Join the testing Server](https://discord.gg/TWRJH6ACvR) - Prefix: `v!`* / self-host it!
- first join a vc
- then type `!control` or `@Bot control`
- then only you can control it by saying the commands you want to.
- dont be too loud and not too quiet.
- beeing loud is contraproductive and might result into worse results
- reduce background noices, speak clear and fluently to be "recogniced" by the bot pretty well!

# Self-Hosting
- Download the repo
- rename `example.env` to `.env` and fill out the variables (get wit.ai `Server Access Token` from [wit.ai](https://wit.ai))
- yarn install / npm install (make sure you have rust on your system)
- node index.js

## Want to add more music commands?

Take a look at my Light-Music-Bot Project, which is similar to this one (for the music system) https://github.com/Tomato6966/light-music-bot

# Resources
- `node-fetch@2` for api Calls
- `discord.js@latest` as my Discord-Bot-Wrapper
- `@discordjs/voice`, `@discordjs/opus`, `discord-ytdl-core`, `ytdl-core`, `youtube-sr`, `ffmpeg`, `libsodium-wrappers` for the Music System (Its similar to [my light-music-bot](https://github.com/Tomato6966/light-music-bot))
- `ffmpeg`, `prism-media`, `node-crc` for parsing / Piping / Transforming Audio Streams, -Buffers and -Files.
- `dotenv` for allowing to use .env ENVIRONMENT Variables

# Explanation and show off Video

https://user-images.githubusercontent.com/68145571/181937812-b8602b54-5f68-48cf-b85d-c076092b606a.mp4

# ~~ToDo~~

- ✅ (28/07/2022 20:17) Change Message Responses from the voice-command, to VOICE-RESPONSES (Bot speaks it)
  - Announce Songs: "Now playing XYZ"
  - also for Skip: "Skipping the current Track"
- ✅ (27/07/2022 18:23) Make the structure better, and fix all bugs
- ✅ (27/07/2022 18:23) Add all to a .env file, and create an example.env file
- ✅ (27/07/2022 18:23) Adjust the Settings
- ✅ (27/07/2022 18:23) Make it multi langual without any modules
- ✅ (27/07/2022 18:23) Try to make it even faster ;)
  
