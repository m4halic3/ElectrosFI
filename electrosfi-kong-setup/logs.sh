echo $'\n\nSERVICES\n\n'

docker compose logs

echo $'\n\nKONG\n\n'

cd docker-kong/compose
docker compose logs

cd ../..