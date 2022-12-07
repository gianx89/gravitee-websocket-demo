package it.gravitee.websocket.demo.service;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class Message {
    private String text;
}
