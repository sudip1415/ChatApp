import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/messages', (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    });
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    } else {
        console.error('WebSocket not connected');
    }
};
