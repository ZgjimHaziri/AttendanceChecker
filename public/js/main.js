const mediaStreamConstraints = {
    video: true
};
const offerOptions = {
    offerToReceiveVideo: 1,
};

const userContainer = document.getElementById("view-container");
const localVideo = document.getElementById('localVideo');
let localStream;
let localUserId;
let connections = [];

function gotRemoteStream(event, userId) {

    let remoteVideo  = document.createElement('video');

    remoteVideo.setAttribute('data-socket', userId);
    remoteVideo.srcObject   = event.stream;
    remoteVideo.autoplay    = true;
    remoteVideo.muted       = true;
    remoteVideo.playsinline = true;
    createUserBox(userId).appendChild(remoteVideo);
    gridView();
}

function createUserBox(userId)
{
    let divBox = document.createElement('div');
    divBox.setAttribute("class",'grid-item');
    divBox.setAttribute('id',userId);
    let nameBox = document.createElement('span');
    nameBox.setAttribute('class','name');

    //duhet me e ndryshu kur te lidhim me databaze
    nameBox.innerHTML = userId;
    divBox.appendChild(nameBox);

    document.querySelector('.grid-container').appendChild(divBox);

    return divBox;
}

function gotIceCandidate(fromId, candidate) {
    connections[fromId].addIceCandidate(new RTCIceCandidate(candidate)).catch(handleError);
}


function startLocalStream() {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(getUserMediaSuccess)
        .then(connectSocketToSignaling).catch(handleError);
}

function connectSocketToSignaling() {
    const socket = io.connect('http://localhost:3000', { secure: true });
    socket.on('connect', () => {
        localUserId = socket.id;
        console.log('localUser', localUserId);
        socket.on('user-joined', (data) => {
            gridView();
            const clients = data.clients;
            const joinedUserId = data.joinedUserId;
            console.log(joinedUserId, ' joined');
            if (Array.isArray(clients) && clients.length > 0) {
                clients.forEach((userId) => {
                    if (!connections[userId]) {
                        connections[userId] = new RTCPeerConnection(mediaStreamConstraints);
                        connections[userId].onicecandidate = () => {
                            if (event.candidate) {
                                console.log(socket.id, ' Send candidate to ', userId);
                                socket.emit('signaling', { type: 'candidate', candidate: event.candidate, toId: userId });
                            }
                        };
                        connections[userId].onaddstream = () => {
                            gotRemoteStream(event, userId);
                        };
                        connections[userId].addStream(localStream);
                    }
                });

                if (data.count >= 2) {
                    connections[joinedUserId].createOffer(offerOptions).then((description) => {
                        connections[joinedUserId].setLocalDescription(description).then(() => {
                            console.log(socket.id, ' Send offer to ', joinedUserId);
                            socket.emit('signaling', {
                                toId: joinedUserId,
                                description: connections[joinedUserId].localDescription,
                                type: 'sdp'
                            });
                        }).catch(handleError);
                    });
                }
            }
        });

        socket.on('user-left', (userId) => {
            let video = document.querySelector('#'+ userId);
            video.parentNode.removeChild(video);
            gridView();
        });

        socket.on('signaling', (data) => {
            gotMessageFromSignaling(socket, data);
        });
    });
}

function gotMessageFromSignaling(socket, data) {
    const fromId = data.fromId;
    if (fromId !== localUserId) {
        switch (data.type) {
            case 'candidate':
                console.log(socket.id, ' Receive Candidate from ', fromId);
                if (data.candidate) {
                    gotIceCandidate(fromId, data.candidate);
                }
                break;

            case 'sdp':
                if (data.description) {
                    console.log(socket.id, ' Receive sdp from ', fromId);
                    connections[fromId].setRemoteDescription(new RTCSessionDescription(data.description))
                        .then(() => {
                            if (data.description.type === 'offer') {
                                connections[fromId].createAnswer()
                                    .then((description) => {
                                        connections[fromId].setLocalDescription(description).then(() => {
                                            console.log(socket.id, ' Send answer to ', fromId);
                                            socket.emit('signaling', {
                                                type: 'sdp',
                                                toId: fromId,
                                                description: connections[fromId].localDescription
                                            });
                                        });
                                    })
                                    .catch(handleError);
                            }
                        })
                        .catch(handleError);
                }
                break;

        }
    }
}

function getUserMediaSuccess(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

function handleError(e) {
    console.log(e);
    alert('Something went wrong');
}

startLocalStream();