package it.gravitee.websocket.demo.service.config.websocket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Component
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    public static final String MESSAGE_PREFIX = "/topic";

    @Value("${spring.rabbitmq.host}")
    private String host;

    @Value("${spring.rabbitmq.port}")
    private Integer port;

    @Value("${rabbitmq.stomp.port}")
    private Integer stompPort;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/notifications/sockjs").setAllowedOriginPatterns("*").withSockJS();
        registry.addEndpoint("/notifications/ws").setAllowedOriginPatterns("*");
    }

    @Override
        public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app").enableStompBrokerRelay("/topic").setRelayHost(host)
                .setRelayPort(stompPort).setClientLogin(username).setClientPasscode(password).setSystemLogin(username)
                .setSystemPasscode(password);
    }
}
