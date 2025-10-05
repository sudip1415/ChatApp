package com.example.ChatApplication.service;

import com.example.ChatApplication.model.Message;
import com.example.ChatApplication.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message) {
        if (message.getTimestamp() == null) {
            message.setTimestamp(Instant.now());
        }
        return messageRepository.save(message);
    }


    // Get conversation between two users
    public List<Message> getConversation(String sender, String receiver) {
        return messageRepository.findBySenderAndReceiverOrSenderAndReceiver(sender, receiver, receiver, sender);

    }

    // Get group messages
    public List<Message> getGroupMessage(String groupName) {
        return messageRepository.findByReceiver(groupName);
    }
}
