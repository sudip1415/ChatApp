package com.example.ChatApplication.dto;

import lombok.Data;

@Data
public class MessageRequestDTO {
    private String sender;
    private String receiver;
    private String content;
}
