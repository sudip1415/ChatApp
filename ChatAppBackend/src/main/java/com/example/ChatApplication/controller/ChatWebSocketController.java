package com.example.ChatApplication.controller;

import com.example.ChatApplication.dto.MessageDTO;
import com.example.ChatApplication.model.Message;
import com.example.ChatApplication.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatWebSocketController {

    private final MessageService messageService;

    public ChatWebSocketController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/messages")
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        Message message = Message.builder()
                .sender(messageDTO.getSender())
                .receiver(messageDTO.getReceiver())
                .content(messageDTO.getContent())
                .timestamp(Instant.now())
                .build();
        Message saved = messageService.saveMessage(message);
        return MessageDTO.fromEntity(saved);
    }
}
