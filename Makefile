start-backend-windows: 
	set COMPOSE_PROJECT_NAME=QueueMaster
	docker compose -f server/docker-compose.dev.yml up -d