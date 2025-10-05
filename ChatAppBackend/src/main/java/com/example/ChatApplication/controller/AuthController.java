package com.example.ChatApplication.controller;

import com.example.ChatApplication.model.User;
import com.example.ChatApplication.repository.UserRepository;
import com.example.ChatApplication.util.JwtUtil;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ------------------ REGISTER ------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(" Username already exists");
        }

        // Create user
        User user = User.builder().username(request.getUsername()).email(request.getEmail()).password(passwordEncoder.encode(request.getPassword())).status("OFFLINE") // default
                .role("ROLE_USER") // default role
                .createdAt(LocalDate.now()).build();

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ------------------ LOGIN ------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("❌ User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        // Update status
        user.setStatus("ONLINE");
        userRepository.save(user);

        // Generate JWT
        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(user.getUsername(), user.getEmail(), token));
    }
}

// ------------------ DTOs ------------------
@Data
class AuthRegisterRequest {
    private String username;
    private String email;
    private String password;
}

@Data
class AuthLoginRequest {
    private String username;
    private String password;
}

@Data
class AuthResponse {
    private final String username;
    private final String email;
    private final String token;
}
