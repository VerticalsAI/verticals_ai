init-network:
	docker network inspect thehive_network >/dev/null 2>&1 || \
        docker network create --driver bridge thehive_network
		
remove-network:
	docker network rm thehive_network || true


# start all infrastructures (redis).
start-infra: init-network
	docker compose --env-file .env.infra -f docker-compose.infra.yml up -d

# stop all infrastructures
stop-infra:
	docker compose --env-file .env.infra -f docker-compose.infra.yml down

# start all apps
start-apps: init-network
	docker compose up -d --build

# stop all apps
stop-apps:
	docker compose down -t 60

# start all components, including infra (mongodb, redis, kafka) & services.
start: init-network start-infra start-apps

# stop all components, including infra and services.
stop: stop-apps stop-infra remove-network

# start all apps
start-apps-local: init-network
	ENV=local.docker docker compose up -d --build

# stop all apps
stop-apps-local:
	ENV=local.docker docker compose down -t 60

# start all components, including infra (mongodb, redis, kafka) & services.
start-local: init-network start-infra start-apps-local

# stop all components, including infra and services.
stop-local: stop-apps-local stop-infra remove-network