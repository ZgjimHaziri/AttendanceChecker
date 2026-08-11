'use strict';

function gridView() {
  const sizeW = [650, 406, 338];
  const sizeH = [350, 188, 157];
  const fontSize = [25, 18, 14];
  const elements = document.getElementsByClassName('grid-item');
  const usersNumber = elements.length;

  let tier = 0;
  for (let j = 0, t = 0; j < 100; j += 4 + t, t++) {
    if (usersNumber > j && usersNumber <= j + 4 + t) {
      tier = Math.min(t, sizeW.length - 1);
      break;
    }
  }

  for (let i = 0; i < usersNumber; i++) {
    elements[i].style.width = `${sizeW[tier]}px`;
    elements[i].style.height = `${sizeH[tier]}px`;
    const nameEl = document.getElementsByClassName('name')[i];
    if (nameEl) {
      nameEl.style.width = `${sizeW[tier]}px`;
      nameEl.style.height = `${sizeH[tier]}px`;
      nameEl.style.fontSize = `${fontSize[tier]}px`;
    }
  }
}

function openChat() {
  const chat = document.getElementById('myChat');
  if (chat) {
    chat.hidden = false;
    chat.style.display = 'block';
  }
}

function closeChat() {
  const chat = document.getElementById('myChat');
  if (chat) {
    chat.hidden = true;
    chat.style.display = 'none';
  }
}

function toggleButton() {
  const sidebar = document.getElementById('mySidebar');
  const main = document.getElementById('main');
  if (!sidebar || !main) {
    return;
  }
  const open = sidebar.style.width === '1200px';
  if (open) {
    sidebar.style.width = '0';
    main.style.marginLeft = '0';
  } else {
    sidebar.style.display = 'block';
    sidebar.style.width = '1200px';
    sidebar.style.height = '567px';
    main.style.marginLeft = '567px';
  }
}

window.gridView = gridView;
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleButton = toggleButton;
