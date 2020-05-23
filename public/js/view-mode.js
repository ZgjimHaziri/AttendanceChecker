const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

function gridView() {

    var size_w = [650,406,338];
    var size_h = [350,188,157];
    var font_size = [25,18,14];

    var elements = document.getElementsByClassName("grid-item");
    var style = window.getComputedStyle(elements[0], null);

    var name_elements = document.getElementsByClassName("name");
    var name_style = window.getComputedStyle(elements[0], null);

    var name_width = name_style.width;
    var name_height = name_style.height;

    var width = style.width;
    var height = style.height;

    var users_number = elements.length;

    var j,t;
    for (j = 0, t=0; j < 100; j+=4+t,t++)
    {
        if (users_number>j && users_number<=j+4+t)
        {
            for (let i = 0; i < users_number; i++) {
                document.getElementsByClassName('grid-item')[i].style.width = size_w[t];
                document.getElementsByClassName('grid-item')[i].style.height = size_h[t];
                document.getElementsByClassName('name')[i].style.width = size_w[t];
                document.getElementsByClassName('name')[i].style.height = size_h[t];
                document.getElementsByClassName('name')[i].style.fontSize = font_size[t];
            }
        }
    }
}

function openChat() {
    document.getElementById("myChat").style.display = "block";
}

function closeChat() {
    document.getElementById("myChat").style.display = "none";
}