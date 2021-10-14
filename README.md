New World Discord Bot is a simple bot which can pull data from https://nwdb.info and display for your community.

# Setup

## Installations

You either need node 16+ installed or docker.

## Create your own application

Go to https://discord.com/developers/applications and create a New Application

## Clone the repo
```
git clone https://github.com/BozoJim/NewWorldStatusBot
cd NewWorldStatusBot
```

## Configure config.json

Rename or copy `.env.example` to `.env`. This is where you'll store your secrets.

Client ID and Application ID are the same. Find this in General Information add it it to your `.env` as `CLIENT_ID`.

Token is the token to access your bot. Keep this one safe! After creating a bot via the Bot tab, click the `Click to Reveal Token` button. Copy that to `TOKEN_ID`.

Guild ID is the id of the channel if you want to use slash commands. Add the ID of your channel as `GUILD_ID`.

Alternatively, you can just use environment variables.

# Run it

You have two options to run it. You can run it via node 16, or you can run it via docker.

## Node

Install Node 16: https://nodejs.org/en/

`node .`

## Docker

`docker build . -t new-world-status-bot`

`docker run --rm -d --name new_world_status_bot new-world-status-bot`
