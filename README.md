# minify

The web client runs on port http://localhost:3000 by default.

This has been tested on a Mac running Big Sur and Docker Desktop 3.1.0 with Docker Compose 1.27.4, however these steps should run on other machines with any recent-ish version of docker and docker-compose installed.

# requirements

docker
docker-compose

# build

docker-compose build

# start

docker-compose up -d

# run client tests

watch tests for client:
docker-compose run --rm client npm test -- --coverage

# run service tests

watch tests for service:
docker-compose run --rm service npm test -- --coverage --watchAll
