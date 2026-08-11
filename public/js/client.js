'use strict';

(function () {
  const config = window.APP_CONFIG || {};
  const socket = io(config.appUrl || undefined, { transports: ['websocket', 'polling'] });
  const messageContainer = document.getElementById('chat-messages');
  const messageForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('msg');
  const presenceTable = document.getElementById('tbody');

  const me = config.user || {};
  socket.emit('new-user', me);

  socket.on('chat-message', (data) => {
    appendMessage(`${data.name}: ${data.message}`);
  });

  socket.on('user-connected', (data) => {
    appendMessage(`${data.name || 'Someone'} joined`);
    socket.emit('add-presence');
  });

  socket.on('user-disconnected', (data) => {
    appendMessage(`${(data && data.name) || 'Someone'} left`);
  });

  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (!message) {
        return;
      }
      appendMessage(`You: ${message}`);
      socket.emit('send-chat-message', message);
      socket.emit('add-presence');
      messageInput.value = '';
    });
  }

  function appendMessage(message) {
    if (!messageContainer) {
      return;
    }
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-messages');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  socket.on('presence-number', (data) => {
    if (!presenceTable) {
      return;
    }
    const names = (data && data.prezenca) || [];
    presenceTable.innerHTML = names
      .map(
        (name, i) =>
          `<tr class="st" id="st${i + 1}"><td class="presence"></td><td class="presence">Prezent</td></tr>`
      )
      .join('');

    // Set text safely to avoid XSS from display names
    [...presenceTable.querySelectorAll('tr')].forEach((row, i) => {
      const cell = row.querySelector('td.presence');
      if (cell) {
        cell.textContent = names[i];
      }
    });
  });

  // Expose for WebRTC signaling in main.js
  window.attendanceSocket = socket;
})();
