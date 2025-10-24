docker compose up -d --build --remove-orphans

cd docker-kong/compose
docker compose up -d
# KONG_DATABASE=postgres docker compose --profile database up -d

cd ..