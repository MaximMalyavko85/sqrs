
```sh
  sudo docker-compose -f ./docker-compose.yaml --env-file ./docker/config/.env.local down -d
```

```sh
  sudo docker-compose -f ./docker-compose.yaml --env-file ./docker/config/.env.local down
```

For rabbit web
```sh
>http://localhost:15672
```

api-auth service +rabbitMQ
```sh
docker-compose restart api-auth
```