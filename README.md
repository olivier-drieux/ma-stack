# Docker

## Wordpress

```
docker run \
--name wordpress \
-p 8080:80 \
-e WORDPRESS_DB_HOST=host.docker.internal:3306 \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=password \
-e WORDPRESS_DB_NAME=wordpress \
-e WORDPRESS_TABLE_PREFIX=wp_ \
-e WORDPRESS_DEBUG=1 \
-d wordpress
```
