### Docker
To deploy this game make sure to have the mongo services up and then:

```sh
cd gameofdrones
docker-compose build
```
This will create the image for deploy both back and front apps

Once it run the port is 3000

```sh
docker-compose up
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

For the node app
```sh
127.0.0.1:6200
```