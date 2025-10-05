# ChatApp

A modern, full-stack real-time chat application built with React.js, Bootstrap, Spring Boot, MongoDB, and WebSocket technology. This project demonstrates secure user authentication, persistent messaging, and instant communication using some of the best tools in web development.

## Features

- **User Registration & Login:** Secure signup and authentication flows.
- **JWT Authentication:** Secure API endpoints using JSON Web Tokens.
- **Real-time Messaging:** Chat instantly with other users using WebSocket.
- **Private & Group Conversations:** Support for both private and group chats.
- **Persistent Storage:** All messages and users are stored in MongoDB.
- **Responsive UI:** Built with React.js and Bootstrap for a modern interface.
- **Theme Support:** Switch between light and dark mode.

## Technologies Used

- **Frontend:** React.js, Bootstrap, CSS, HTML
- **Backend:** Spring Boot (Java), Spring Security, WebSocket (STOMP)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure

```
ChatApp/
├── ChatAppFrontend/      # React + Bootstrap frontend
│   └── src/
│       ├── pages/        # Login, Register, Chat pages
│       ├── component/    # ChatWindow, MessageInput, etc.
│       └── services/     # API and WebSocket clients
└── ChatAppBackend/       # Spring Boot backend
    └── src/
        ├── main/java/com/example/ChatApplication/
        │   ├── config/      # Security and JWT configuration
        │   ├── dto/         # Data transfer objects (DTOs)
        │   ├── repository/  # MongoDB repositories
        │   └── util/        # JWT Utility
        └── test/
```

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Java 17+ (for backend)
- MongoDB (local or remote)

### Backend Setup

1. Go to `ChatAppBackend`.
2. Set up the `application.properties` file with your MongoDB URI and JWT secret:
    ```
    spring.data.mongodb.uri=mongodb://localhost:27017/chatapp
    jwt.secret=YourVerySecretKey
    ```
3. Run the Spring Boot backend:
    ```sh
    ./mvnw spring-boot:run
    ```
   The backend will start at `http://localhost:8080/`.

### Frontend Setup

1. Go to `ChatAppFrontend`.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend:
    ```sh
    npm run dev
    ```
   The app will be available at `http://localhost:5173/` by default.

### Usage

- Register a new account.
- Log in to receive a JWT token (stored in local storage).
- Start chatting with others in real time!

## Contribution

1. Fork the repository and create your feature branch.
2. Commit your changes and open a pull request.
3. Please ensure your code follows the ESLint config (`ChatAppFrontend/eslint.config.js`).

## License

No license has been specified. Contact the repository owner for inquiries.

---

> **Repository:** [sudip1415/ChatApp](https://github.com/sudip1415/ChatApp)
