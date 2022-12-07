package it.gravitee.websocket.demo.service;

import it.gravitee.websocket.demo.service.config.websocket.WebSocketConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    private SimpMessagingTemplate websocket;

    @PostMapping("/messages")
    void postMessage() {
        Message message = new Message();
        message.setText("Hello world!!!");

        websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX + "/messages", message);
    }
}
