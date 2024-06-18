start-backend-windows: 
	(cd server\app\que && \
	mvn clean package && \
	cd ..\..\..)
	set COMPOSE_PROJECT_NAME=QueueMaster
	docker compose -f server\docker-compose.dev.yml up -d