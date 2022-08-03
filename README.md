
# Voice Controlled Discord Bot

This repository is for the 5th Hackathon of Documatic.
With that Project I am aiming to place `#1` and win 50€

![Banner](https://imgur.com/ZCuO0KT.gif)

# About

It is a voice controlled Discord Bot, means you (mainly) do not use prefix / Slash Commands, no! You will be using your VOICE.

Ofc. you somehow need to parse that audio, for that I am using https://wit.ai which is a free speech-to-text ai, which you need to train!
That means it might sometimes not return what you say... but I tested it over 19 months on another Project, and there it works 100% everytime, even multilangual now..

It is a Music Bot, as other interactions are not that optimal, like kick / ban, you can't control that with voice 100% sure...

[Check out the **Show-off and Tutorial Video**](https://github.com/Tomato6966/voice-controlled-discord-bot/blob/main/README.md#explanation-and-show-off-video)

![image](https://user-images.githubusercontent.com/68145571/182658779-1638aed0-10e3-4c23-b95d-1f7e36d8fc82.png)

# System-Requirements
- **Idle Load**: **`17mb Ram`**
- **High Load**: **`25-30mb Ram`**
- **Highest Memory Load** *with HEAPS for 2 Days runtime*: **`97mb Ram`**
- **JS-Engine:** [nodejs v16.10 or later](https://nodejs.org)
- **RUST (cmake):** [latest](https://www.rust-lang.org/tools/install)
- **FFMPEG:** `npm i ffmpeg-static ffmpeg` & `apt-get install -y ffmpeg`

| Recommended-CPU | Recommended-RAM |
|--|--|
| 1 CORE | 250mb Ram |

### Example Usage

>![image](https://user-images.githubusercontent.com/68145571/182658298-f079f132-29ad-4259-8328-d9c1ebfad280.png)

# How to use the Bot? | [Check the Video](https://github.com/Tomato6966/voice-controlled-discord-bot#explanation-and-show-off-video)
 0. *[Join the testing Server](https://discord.gg/TWRJH6ACvR) - Prefix: `v!`* / [self-host it!](https://github.com/Tomato6966/voice-controlled-discord-bot/blob/main/README.md#self-hosting)
 1. Join a Discord Voice-Channel, *in a Server, where the Bot is in!*
 2. Type in a Text-Channel `v!control` or `@Bot control`
	 a. *Now it'll only listen and be controlable by YOU* 
 3. Speak your COMMANDS and add a KEYWORD in beforehand.
	 a. **Examples**:
		 i. `bot play shape of you`
		 ii. `bot play thunder`
		 iii. `bot play despacito`
		 iv. `bot nightcore` *=Audio-Filter*
		 v. `bot skip`
		 vi. `bot stop`
 4. Tipps to get understood more often!
	 a. Make sure to talk in a normal speed and loudness, do not scream or errape
	 b. Also Make sure to Reduce background noices, speak clear and fluently to be "recogniced" by the bot pretty well!

# Self-Hosting
1. Download the repo | [Click-here](https://github.com/Tomato6966/voice-controlled-discord-bot/archive/refs/heads/main.zip) 
	- or: `git clone https://github.com/Tomato6966/voice-controlled-discord-bot`
2. Rename `example.env` to `.env` and fill out the variables *(get wit.ai `Server Access Token` from [wit.ai](https://wit.ai))*
3. `yarn install` / `npm install` (make sure you have `rust` & `nodejs` on your system)
4. Type `node index.js` / `npm start`

## Want to add more music commands?

Take a look at my Light-Music-Bot Project, which is similar to this one (for the music system) https://github.com/Tomato6966/light-music-bot

# Resources used (modules & credits)
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
  
  

