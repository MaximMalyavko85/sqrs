
```sh
  sudo docker-compose -f ./docker-compose.yaml --env-file ./docker/config/.env.local down -d
```

```sh
  sudo docker-compose -f ./docker-compose.yaml --env-file ./docker/config/.env.local down
```

For rabbit web (15672-default)
```sh
>http://localhost:15672
```

Obsticals- api-auth service started before rabbitMq services
We need to manual set up api-services after rabbitmq service

```sh
docker-compose restart api-auth
```