const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('chat-messages');
const messageForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');

//Duhet me databaze


const name = "";
socket.emit('new-user', name);

socket.on('chat-message', data => {
  console.log(data);
  appendMessage(`${data.name}: ${data.message}`)
});

socket.on('user-connected', name => {

});

socket.on('user-disconnected', name => {

});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);

  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message) {
  console.log(messageInput.value);
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement)
}