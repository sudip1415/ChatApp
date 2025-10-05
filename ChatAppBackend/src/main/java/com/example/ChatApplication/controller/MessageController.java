package com.example.ChatApplication.controller;

import com.example.ChatApplication.dto.MessageDTO;
import com.example.ChatApplication.dto.MessageRequestDTO;
import com.example.ChatApplication.model.Message;
import com.example.ChatApplication.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Send message
    @PostMapping("/send")
    public ResponseEntity<MessageDTO> sendMessage(@RequestBody MessageRequestDTO request) {
        Message message = Message.builder()
                .sender(request.getSender())
                .receiver(request.getReceiver())
                .content(request.getContent())
                .build();
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(MessageDTO.fromEntity(savedMessage));
    }

    // Get conversation between two users

    @GetMapping("/conversation")
    public ResponseEntity<List<MessageDTO>> getConversation(
            @RequestParam String sender,
            @RequestParam String receiver) {

        List<MessageDTO> conversation = messageService.getConversation(sender, receiver)
                .stream()
                .map(MessageDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(conversation);
    }

    // Get group messages
    @GetMapping("/group")
    public ResponseEntity<List<MessageDTO>> getGroupMessages(@RequestParam String groupName) {
        List<MessageDTO> groupMessages = messageService.getGroupMessage(groupName)
                .stream()
                .map(MessageDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(groupMessages);
    }
}
