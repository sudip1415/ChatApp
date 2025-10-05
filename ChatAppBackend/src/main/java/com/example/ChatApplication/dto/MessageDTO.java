package com.example.ChatApplication.dto;

import com.example.ChatApplication.model.Message;
import lombok.Data;

import java.time.Instant;

@Data
public class MessageDTO {
    private String id;
    private String sender;
    private String receiver;
    private String content;
    private Instant timestamp;

    public static MessageDTO fromEntity(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setSender(message.getSender());
        dto.setReceiver(message.getReceiver());
        dto.setContent(message.getContent());
        dto.setTimestamp(message.getTimestamp());
        return dto;
    }
}
