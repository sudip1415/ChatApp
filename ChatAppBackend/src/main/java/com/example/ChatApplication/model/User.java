package com.example.ChatApplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String email;
    private String password;

    // By default OFFLINE until login
    private String status;  // Values: "ONLINE", "OFFLINE"

    private LocalDate createdAt;

    // Default role
    private String role;  // e.g., ROLE_USER, ROLE_ADMIN
}
