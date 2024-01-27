apistart:
	@npm run dev

apinpmstart:
	@npm start

dockerapiup:
	@docker compose --env-file .env -f ./docker-compose.yaml up --build -d

dockerapidown:
	@docker compose --env-file .env -f ./docker-compose.yaml down --volumes --remove-orphans

.PHONY= apistart apinpmstart dockerapiup dockerapidown
