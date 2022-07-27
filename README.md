# Voice Controlled Discord Bot

This repository is for the 5th Hackathon of Documatic.
With that Project I am aiming to place `#1` and win 50€


# About

It is a voice controlled Discord Bot, means you (mainly) do not use prefix / Slash Commands, no! You will be using your VOICE.

Ofc. you somehow need to parse that audio, for that I am using https://wit.ai which is a free speech-to-text ai, which you need to train!
That means it might sometimes not return what you say... but I tested it over 19 months on another Project, and there it works 100% everytime, even multilangual now..

It is a Music Bot, as other interactions are not that optimal.

Currently it announces the songs via a MESSAGE, but I will change that ... (see todo)


# Resources
- `node-fetch@2` for api Calls
- `discord.js@latest` as my Discord-Bot-Wrapper
- `@discordjs/voice`, `@discordjs/opus`, `discord-ytdl-core`, `ytdl-core`, `youtube-sr`, `ffmpeg`, `libsodium-wrappers` for the Music System (Its similar to [my light-music-bot](https://github.com/Tomato6966/light-music-bot))
- `ffmpeg`, `prism-media`, `node-crc` for parsing / Piping / Transforming Audio Streams, -Buffers and -Files.
- `dotenv` for allowing to use .env ENVIRONMENT Variables


# ToDo

- Change Message Responses from the voice-command, to VOICE-RESPONSES (Bot speaks it)
  - Announce Songs: "Now playing XYZ"
  - also for Skip: "Skipping the current Track"
- Make the structure better, and fix all bugs
- Add all to a .env file, and create an example.env file
- Adjust the Settings
- Make it multi langual without any modules
- Try to make it even faster ;)
  
