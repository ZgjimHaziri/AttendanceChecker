const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


function gridView() {
    var elements = document.getElementsByClassName("grid-item");
    var style = window.getComputedStyle(elements[0], null);

    var width = style.width;
    var height = style.height;

    var users_number = elements.length;
    for (let i = 0; i < users_number; i++) {
        document.getElementsByClassName('grid-item')[i].style.width = width;
        document.getElementsByClassName('grid-item')[i].style.height = height;
    }

    width = width.match(/\d/g);
    width = width.join("");

    height = height.match(/\d/g);
    height = height.join("");

    var row_count = Math.floor(1500 / width);
    console.log('Width: ' + width);

    console.log('Rows: ' + row_count);
    console.log('Users: ' + users_number);

    if ((users_number % (row_count * row_count)) === 1) {
        divider = 2 - users_number / 12.5;
        console.log('Divider: ' + divider);
        for (let i = 0; i < users_number; i++) {
            document.getElementsByClassName('grid-item')[i].style.width = Math.round(width / divider);
            document.getElementsByClassName('grid-item')[i].style.height = Math.round(height / divider);
        }
    }
}

function addUsers() {
    document.getElementById('view-container').innerHTML += "<div class=\"grid-item\">\n" +
        "                    <p>You</p>\n" +
        "                </div>"
}

function openChat() {
    document.getElementById("myChat").style.display = "block";
}

function closeChat() {
    document.getElementById("myChat").style.display = "none";
}