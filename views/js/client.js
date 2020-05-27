const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('chat-messages');
const messageForm = document.getElementById('chat-form');
const messageInput = document.getElementById('msg');
const presenceTable = document.getElementById("tbody");

//Duhet me databaze


const name = "";
socket.emit('new-user', name);

socket.on('chat-message', data => {
  console.log(data);
  appendMessage(`${data.name}: ${data.message}`);
  socket.emit('add-presence', data.name);
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
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-messages');
  messageElement.innerText = message;
  messageContainer.append(messageElement)
}

socket.on('presence-number', (data)=>{
  /*var tr = document.createElement("tr");
  tr.setAttribute("class","st");

  var td1 = document.createElement("td");
  var td2 = document.createElement("td");

  td1.setAttribute("class","presence");

  td2.setAttribute("class","presence");

  for (let i = 0; i < data.prezenca.length; i++)
  {
      console.log(i);
      tr.setAttribute("id","st"+(i+1));
      td1.innerHTML=data.prezenca[i];
      td2.innerHTML="Prezent";

      tr.appendChild(td1);
      tr.appendChild(td2);

      presenceTable.appendChild(tr);
      console.log(presenceTable);
  }
  console.log(data.prezenca);
*/
  var q = "";


  for (let i = 0; i < data.prezenca.length; i++)
  {
    q +="<tr class=\"st\" id=\"st"+(i+1)+"\">\n" +
        "                <td class=\"presence\">"+data.prezenca[i]+"</td>\n" +
        "                <td class=\"presence\">Prezent</td>\n" +
        "            </tr>";
  }


  presenceTable.innerHTML = q;

  console.log(presenceTable);
});
