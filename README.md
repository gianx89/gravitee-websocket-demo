- Run `docker-compose build --no-cache`
- Run ` docker-compose up -d`
- Go to http://localhost/apim/management_ui
- Login with user *admin* and password *admin*
- Import and start the demo API from the *Demo-1.json* file
- Go to http://localhost:9080
- Open Google Chrome Developer Tools
- Test both connection modes: SockJS connection works, WebSockets connection doesn't work.
- To generate a message send a POST request to http://localhost/apim/demo/wsService/messages . Body content is not important.
- You can see the *Hello world!!!* message on screen if the connection works.

**Exposed ports can be changed editing the docker-compose.yml file.**