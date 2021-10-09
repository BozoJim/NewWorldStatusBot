New World Discord Bot is a simple bot which can pull data from https://nwdb.info and display for your community.

# Setup

## Installations

You either need node 14+ and chrome installed or docker.

## Create your own application

Go to https://discord.com/developers/applications and create a New Application

## Clone the repo
```
git clone https://github.com/JimBozo/NWStatusBot
cd NWStatusBot
```

## Configure config.json

Rename or copy `config.json.example` to `config.json`. This is where you'll store your secrets.

Client ID and Application ID are the same. Find this in General Information add it it to your `config.json` as `clientID`.

Token is the token to access your bot. Keep this one safe! After creating a bot via the Bot tab, click the `Click to Reveal Token` button. Copy that to `tokenID`.

Guild ID is the id of the channel if you want to use slash commands. Add the ID of your channel as `guildId`.
