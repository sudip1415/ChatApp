import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "bootstrap/dist/css/bootstrap.min.css";

let stompClient = null;

function ChatWindow() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [dark, setDark] = useState(() => (localStorage.getItem("theme") === "dark"));
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Connect WebSocket
  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);

    stompClient.connect({}, () => {
      setConnected(true);
      console.log("✅ Connected to WebSocket");
      stompClient.subscribe("/topic/messages", (message) => {
        const receivedMsg = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMsg]);
      });
    }, (error) => {
      console.error("❌ Connection failed:", error);
      setConnected(false);
    });
  };

  // Send message
  const sendMessage = () => {
    if (stompClient && connected && content.trim() !== "") {
      const chatMessage = {
        sender: username,
        receiver: receiver || "Global",
        content: content,
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setContent("");
    }
  };

  // Disconnect WebSocket
  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        setConnected(false);
        console.log("Disconnected");
      });
    }
  };

  return (
    <div className={`chat-shell ${dark ? 'theme-dark' : 'theme-light'}`}>
      <div className="chat-header gradient">
        <div className="brand d-flex align-items-center gap-2">
          <div className="logo">💬</div>
          <div className="title">Chat</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className={`badge ${connected ? 'text-bg-success' : 'text-bg-secondary'}`}>{connected ? 'Connected' : 'Disconnected'}</div>
          <div className="form-check form-switch m-0">
            <input className="form-check-input" type="checkbox" id="darkToggle" checked={dark} onChange={() => setDark(v => !v)} />
            <label className="form-check-label" htmlFor="darkToggle">{dark ? 'Dark' : 'Light'}</label>
          </div>
          {connected && (
            <button className="btn btn-outline-danger btn-sm" onClick={disconnect}>Disconnect</button>
          )}
        </div>
      </div>

      <div className="chat-container container py-4">
        {!connected ? (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card chat-card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  <h4 className="mb-3 fw-semibold">Welcome</h4>
                  <p className="text-muted mb-4">Enter your username to start chatting.</p>
                  <div className="mb-3">
                    <label className="form-label">Your username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. alice"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary w-100" onClick={connect} disabled={!username}>Connect</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12">
              <div className="card chat-card border-0 rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-wrap align-items-end gap-3 mb-3">
                    <div className="flex-grow-1">
                      <div className="small text-muted">Chatting as</div>
                      <div className="fw-semibold">{username || 'Unknown'}</div>
                    </div>
                    <div className="receiver-input">
                      <label className="form-label mb-1">To</label>
                      <input className="form-control" placeholder="e.g. bob" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                    </div>
                  </div>

                  <div className="messages-window rounded-3 p-3">
                    {messages.length ? messages.map((msg, index) => (
                      <div key={index} className={`msg-row ${msg.sender === username ? 'me' : 'them'}`}>
                        <div className={`msg-bubble ${msg.sender === username ? 'mine' : ''}`}>
                          <div className="msg-content">{msg.content}</div>
                          <div className="msg-meta">{msg.sender}</div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center text-muted">No messages yet</div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="composer d-flex gap-2 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={"Type a message"}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      
                    />
                    <button className="btn btn-primary px-4" onClick={sendMessage} disabled={!content.trim()}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
