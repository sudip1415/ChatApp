package com.example.ChatApplication.repository;

import com.example.ChatApplication.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {

    // One way (not used anymore)
    List<Message> findBySenderAndReceiver(String sender, String receiver);

    // Both ways (sender ↔ receiver)
    List<Message> findBySenderAndReceiverOrSenderAndReceiver(String sender1, String receiver1, String sender2, String receiver2);

    // For group messages
    List<Message> findByReceiver(String receiver);
}
