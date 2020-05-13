//Cliente

const socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function() {    
    if(username.value !== '') {
        var audio = new Audio("bleep.mp3");
        audio.play();

        //Emite mensaje
        socket.emit('chat:message', {
            username: username.value,
            message: message.value
        });

        message.value = '';
        message.focus();
    } else {
        var audio = new Audio("error.mp3");
        audio.play();
        setTimeout(function(){ 
            alert("no se puede enviar un mensaje sin un usuario definido");
            username.focus();
        }, 500);
        
    }
    
});

//typing
message.addEventListener('keypress', function() {
    console.log(username.value);
    socket.emit('chat:typing', username.value);
})

//Escucha mensaje
socket.on('chat:message', function(data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} esta escribiendo...</em></p>`
})