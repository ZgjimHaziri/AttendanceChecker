'use strict';

function highlightCell(param1, rowArg) {
  const cells = document.getElementById('mytable').getElementsByTagName('td');
  if (!cells[param1]) {
    return;
  }
  cells[param1].style.backgroundColor = '#B0D182';

  const param = param1 + 1;
  const i = param % 5 === 0 ? param / rowArg : param % 5;
  const anchor = document.querySelector(
    `table tr:nth-child(${rowArg}) td:nth-child(${i}) > a`
  );
  if (anchor) {
    anchor.setAttribute('href', '/room');
  }
}

function updateBackground() {
  const week = [1, 2, 3, 4, 5];
  const hour = [8, 10, 15, 12, 16, 14, 11];
  const minute = [55, 30, 15, 0, 15];
  const hr = new Date().getHours();
  const d = new Date().getDay();
  const n = new Date().getMinutes();

  for (let i = 0; i < week.length; i++) {
    for (let j = 0; j < hour.length; j++) {
      for (let k = 0; k < minute.length; k++) {
        if (d === week[i] && hr === hour[j] && n === minute[k]) {
          switch (d) {
            case 1:
              if (hr === 8) highlightCell(1, 1);
              if (hr === 10) highlightCell(2, 1);
              if (hr === 15) highlightCell(3, 1);
              break;
            case 2:
              if (hr === 8) highlightCell(6, 2);
              if (hr === 10) highlightCell(7, 2);
              if (hr === 12) highlightCell(8, 2);
              if (hr === 16) highlightCell(9, 2);
              break;
            case 3:
              if (hr === 8) highlightCell(11, 3);
              if (hr === 10) highlightCell(12, 3);
              if (hr === 14) highlightCell(13, 3);
              break;
            case 4:
              if (hr === 14) highlightCell(16, 4);
              break;
            case 5:
              if (hr === 12) highlightCell(21, 5);
              break;
            default:
              break;
          }
        }
      }
    }
  }
}

window.addEventListener('load', updateBackground);
