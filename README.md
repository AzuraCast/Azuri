[AzuraCast]: (https://www.azuracast.com/)
[Discord]: (https://discord.com)
![Azuri Logo](https://i.ninjalabs.dev/hdcgwht.png)

# Azuri: A [Discord] bot for [AzuraCast]

[![Build Status](https://travis-ci.com/NinjaLabs-Dev/Azuri.svg?branch=master)](https://travis-ci.com/NinjaLabs-Dev/Azuri)
[![Apache 2.0 License](https://img.shields.io/github/license/azuracast/azuracast.svg)]()
[![Ethical Open Source](https://img.shields.io/badge/open-ethical-%234baaaa)](https://ethicalsource.dev/definition/)
[![DeepScan grade](https://deepscan.io/api/teams/11651/projects/14572/branches/274342/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11651&pid=14572&bid=274342)
[![Twitter Follow](https://img.shields.io/twitter/follow/AzuriApp.svg?style=social&label=Follow)](https://twitter.com/AzuriApp)
[![Invite Image](https://img.shields.io/badge/Invite-Invite%20the%20bot-blue)](https://discord.com/api/oauth2/authorize?client_id=773671716529504267&permissions=3411008&scope=bot)

**Azuri** is a simple but powerful [Discord] bot to intergrate the open-source radio host [AzuraCast] within your [Discord] community.

### Invite
[![Invite Image](https://img.shields.io/badge/Invite-Invite%20the%20bot-blue)](https://discord.com/api/oauth2/authorize?client_id=773671716529504267&permissions=3411008&scope=bot)

![Overview Photos](https://i.ninjalabs.dev/onbicck.png)

**Azuri** is currently in active development with new features and bugs fixed on the daily and is not a *final product* in any means. Azuri was created to support the new and up coming radio's that take use of [AzuraCast] and provide a platform to bride the gap from the community to the radio. 

## Hosted or Self Hosted?
**Azuri** is hosted allowing anyone to invite the bot using [this invite](https://discord.com/api/oauth2/authorize?client_id=773671716529504267&permissions=3411008&scope=bot) into their server and experiance it to it's full potential. Want to go the extra mile and make it custom? Fllow the steps below.

## Prerequisites
 - [**NodeJS**](https://nodejs.org/): >= 12.18.4
 - [**NPM**](https://www.npmjs.com/get-npm): >= 6.14.6

## Installation & Useage
Azuri is open-source so you can host your own! If you want to customize something or just want a seocnd that's fine!

To install and run follow these steps:
  1. `npm install`
  2. Edit `.env` with your `BOT_TOKEN`*¹ and other options
  3. `node app.js` ***Note:*** DO **NOT** run via `index.js` the bot uses [sharding](https://discordjs.guide/sharding/) to allow scalability and is required to run through `app.js`

**¹ - This can be generated [here](https://discord.com/developers/applications) view a guide [here](https://discordpy.readthedocs.io/en/latest/discord.html)*

## What's used
We use multiple packages to make sure the bot is the easiest to use and navigate for the end-user. 

[Discord.JS](http://discord.js.org/) w/ [Opus](https://www.npmjs.com/package/@discordjs/opus) offical NodeJS library.

[Axios](https://www.npmjs.com/package/axios) used for API calls

[dotenv](https://www.npmjs.com/package/dotenv) used for `.env` files and enviroment variables

[ffmpeg](https://www.npmjs.com/package/ffmpeg-static) used for audio streaming

[fs](https://www.npmjs.com/package/fs) used for storing data in files

[octonode](https://www.npmjs.com/package/octonode) used for version checking against Github

*Dev Resources*

[nodemon](https://www.npmjs.com/package/nodemon) hot reloading for development

[eslint](https://www.npmjs.com/package/eslint) used for code functionaility and error checking

## Bug Reporting 
Found a bug? [Report it](https://github.com/NinjaLabs-Dev/Azuri/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+)!

*Before reporting please check [Issues](https://github.com/NinjaLabs-Dev/Azuri/issues) and [Projects](https://github.com/NinjaLabs-Dev/Azuri/projects)*

## Feature Request
Thought of a great idea? [Reuqest it](https://github.com/NinjaLabs-Dev/Azuri/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)!

*Before requesting please check [Issues](https://github.com/NinjaLabs-Dev/Azuri/issues) and [Projects](https://github.com/NinjaLabs-Dev/Azuri/projects)*

## Support
Azuri is provided free of charge but if you feel it's useful support us!

### Azuri 
<a href="https://ko-fi.com/ninjalabs" target="_blank" title="Buy me a coffee!"><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=b' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R22KA59DG36GE"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"></a>

### Azura
[Check for their infomation!](https://github.com/AzuraCast/AzuraCast/blob/master/README.md#support-azuracast-development)


## License

Azuri is licensed under the [Apache license, version 2.0](https://github.com/NinjaLabs-Dev/Azuri/blob/master/LICENSE.txt). This project is free and open-source software, pull requests are always welcome along with bug and feature reports/requests