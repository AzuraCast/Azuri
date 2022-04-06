[azuracast]: (https://www.azuracast.com/)
[discord]: (https://discord.com)

![Azuri Logo](https://camo.githubusercontent.com/77de5737c016fc440ca60c6a990988b01e7e12a6a5020c91f40971a402842cbe/68747470733a2f2f692e6e696e6a616c6162732e6465762f686463677768742e706e67)

# Azuri: A [Discord] bot for [AzuraCast]

<!--[![Build Status](https://travis-ci.com/NinjaLabs-Dev/Azuri.svg?branch=master)](https://travis-ci.com/NinjaLabs-Dev/Azuri)-->

[![Invite Image](https://img.shields.io/badge/Invite-Invite%20the%20bot-blue)](https://discord.com/api/oauth2/authorize?client_id=814434268762603551&permissions=0&scope=bot)
[![Apache 2.0 License](https://img.shields.io/github/license/azuracast/azuracast.svg)]()
[![Ethical Open Source](https://img.shields.io/badge/open-ethical-%234baaaa)](https://ethicalsource.dev/definition/)
[![DeepScan grade](https://deepscan.io/api/teams/11651/projects/14572/branches/274342/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11651&pid=14572&bid=274342)

<!--[![Twitter Follow](https://img.shields.io/twitter/follow/AzuriApp.svg?style=social&label=Follow)](https://twitter.com/AzuriApp)-->

Azuri is a simple but powerful [Discord](https://discord.com/) bot to integrate the open-source web radio management suite **[AzuraCast](https://azuracast.com)** into your [Discord] community.

<!-- remove overview photo since it is dead
![Overview Photos](https://i.ninjalabs.dev/0pds770.png)
-->

Azuri was created to support new radios that use [AzuraCast], and provide a platform to connect the radio and community.

### Discord Invite Link

[![Invite Image](https://img.shields.io/badge/Invite-Invite%20the%20bot-blue)](https://discord.com/api/oauth2/authorize?client_id=814434268762603551&permissions=0&scope=bot)

## Support?
Join our discord group for free support also for other things then Azuri, need even faster support open a ticket!

[![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/5t3KaGX8Bx)

If you have any problems just make an issue

## Commands & Usage

Use `~help` to view available commands adding the bot to your server.

To setup the api you need this:

``https://yourazuradomain.com/api/nowplaying_static/STATIONNAME.json``

## Hosted or Self-Hosted?

Azuri has **both**! We have it hosted, allowing anyone to invite the bot using this [invite](https://discord.com/api/oauth2/authorize?client_id=814434268762603551&permissions=0&scope=bot) into their server and experience Azuri to its full potential. Want to go the extra mile and make it self-host it for the custom experience? Follow the steps below.

## Installing Self-Hosted Version

Azuri is open-source, so you can host your own! Perfect if you want to customize something yourself.

### Via Docker (Recommended)

#### Requirements:

- [Docker](https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop for Windows or Mac)
- [Discord bot token](https://discord.com/developers/applications)
  - [Read a how-to guide](https://discordpy.readthedocs.io/en/latest/discord.html)

#### Installation and Usage

1.  Copy `azuri.sample.env` to `azuri.env`
2.  Edit `azuri.env` with your Discord `BOT_TOKEN`
3.  Run `docker-compose up -d`

### Direct Installation

#### Requirements:

- [**NodeJS**](https://nodejs.org/): >= 16.6.0
- [**NPM**](https://www.npmjs.com/get-npm): >= 6.14.6

#### Installation

To install and run:

1.  Copy `azuri.sample.env` to `src/.env`
2.  Change into the `src` directory
3.  Edit `.env` with your Discord `BOT_TOKEN`
4.  Run `npm ci`
5.  Run `npm run azuri`

## Dependencies Used

We use multiple packages to make sure Azuri is easy to use and navigate for the end-user.

- [Discord.JS](http://discord.js.org/) with [Opus](https://www.npmjs.com/package/@discordjs/opus) offical NodeJS library
- [Axios](https://www.npmjs.com/package/axios) used for API calls
- [dotenv](https://www.npmjs.com/package/dotenv) used for `.env` files and enviroment variables
- [ffmpeg](https://www.npmjs.com/package/ffmpeg-static) used for audio streaming
- [fs](https://www.npmjs.com/package/fs) used for storing data in files

### Developer Resources

- [nodemon](https://www.npmjs.com/package/nodemon) hot reloading for development
- [eslint](https://www.npmjs.com/package/eslint) used for code functionaility and error checking

## Bug Reporting

Found a bug? [Report it](https://github.com/TwixGamer00/Azuri/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+)!

\* _before reporting please check for existing [issues](https://github.com/AzuraCast/Azuri/issues)_ <!-- and [Projects](https://github.com/AzuraCast/Azuri/projects)-->

## Feature Request

Thought of a great idea? [Request it](https://github.com/TwixGamer00/Azuri/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)!

\* _before requesting please check for existing [issues](https://github.com/AzuraCast/Azuri/issues)_ <!-- and [Projects](https://github.com/AzuraCast/Azuri/projects)-->


## License

Azuri is licensed under the [Apache License, version 2.0](https://github.com/TwixGamer00/Azuri/blob/master/LICENSE). This project is free and open-source software; pull requests are always welcome along with bug and feature reports/requests.
