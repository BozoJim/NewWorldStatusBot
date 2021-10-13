docker build . -t new-world-status-bot
docker stop new_world_status_bot
docker run --rm -d --name new_world_status_bot new-world-status-bot
docker ps
