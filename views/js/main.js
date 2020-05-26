const mediaStreamConstraints = {
    video: true,
    audio: true
};
const offerOptions = {
    offerToReceiveVideo: 1,
};

const gnames = ["Zgjim Haziri","Qendresa Bekaj","Loreta Shala","Vegim Shala","Behar Rexhepi"];

let perdoruesit;

let login_table;

const userContainer = document.getElementById("view-container");
const localVideo = document.getElementById('localVideo');

const micBox = document.getElementById("mic-icon");
const camBox = document.getElementById("cam-icon");

var emripalidhje = document.getElementById("tbody");

let localStream;
let localUserId;
let connections = [];

let localMediaStream;
let localVideoTrack;
let localAudioTrack;

var mic_state = { };
var video_state = { };

function gotRemoteStream(event, userId) {

    let remoteVideo  = document.createElement('video');

    remoteVideo.setAttribute('data-socket', userId);
    remoteVideo.srcObject   = event.stream;
    remoteVideo.autoplay    = true;
    remoteVideo.muted       = false;
    remoteVideo.playsinline = true;
    createUserBox(userId).appendChild(remoteVideo);
    gridView();
}

function manage_voice(userId)
{
    var webcam = document.querySelector('#' + userId + '>video');
    console.log(webcam);

    if(video_state[userId]==true)
    {
        webcam.play();
    }
    else
    {
        webcam.pause();
    }

    if(mic_state[userId]==true)
    {
        webcam.muted = false;
    }
    else
    {
        webcam.muted = true;
    }
}

function turnOnOffCam()
{
    const tr = document.createElement("tr");
    tr.setAttribute("class","st");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.setAttribute("class","presence");


    td2.setAttribute("class","presence");
    if(localMediaStream.getVideoTracks().length>0)
    {
        if (localMediaStream.getVideoTracks()[0].enabled)
        {
            localVideoTrack = localMediaStream.getVideoTracks()[0];
            localMediaStream.getVideoTracks()[0].enabled = false;

            camBox.setAttribute("src","img/off-video.png");
        }
        else
        {
            for (let i = 0; i < gnames.length; i++)
            {
                if(localUserId===perdoruesit[i])
                {
                    tr.setAttribute("id","st"+(i+1));
                    td1.innerText=gnames[i-1];
                    td2.innerText="Prezent";
                }
            }


            localMediaStream.active = true;
            localMediaStream.getVideoTracks()[0].enabled = true;
            camBox.setAttribute("src","img/on-video.png");

        }
        /*mediaStreamConstraints.video = false;*/
    }
    else
    {
        localMediaStream.active = true;
        localMediaStream.getVideoTracks()[0] = localVideoTrack;
        localMediaStream.getVideoTracks()[0].enabled = true;
        camBox.setAttribute("src","img/on-video.png");
        /*mediaStreamConstraints.video = true;*/

        for (let i = 0; i < gnames.length; i++)
        {
            if(localUserId===perdoruesit[i])
            {
                tr.setAttribute("id","st"+(i+1));
                td1.innerText=gnames[i-1];
                td2.innerText="Prezent";
            }
        }
    }
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.getElementById("tbody").append(tr);
    console.log(camBox);

    getUserMediaSuccess(localMediaStream);
}

function turnOnOffMic()
{
    if(localMediaStream.getAudioTracks().length>0)
    {
        if (localMediaStream.getAudioTracks()[0].enabled)
        {
            localAudioTrack = localMediaStream.getAudioTracks()[0];
            localMediaStream.getAudioTracks()[0].enabled = false;
            micBox.setAttribute("src","img/muted.png");
        }
        else
        {
            /*localMediaStream.active = true;*/
            localMediaStream.getAudioTracks()[0].enabled = true;
            micBox.setAttribute("src","img/unmuted.png");
        }
        /*mediaStreamConstraints.video = false;*/
    }
    else
    {
        /*localMediaStream.active = true;*/
        localMediaStream.getAudioTracks()[0] = localAudioTrack;
        localMediaStream.getAudioTracks()[0].enabled = true;
        micBox.setAttribute("src","img/unmuted.png");
        /*mediaStreamConstraints.video = true;*/
    }

    getUserMediaSuccess(localMediaStream);
}

function createUserBox(userId)
{
    let divBox = document.createElement('div');
    divBox.setAttribute("class",'grid-item');
    divBox.setAttribute('id',userId);
    let nameBox = document.createElement('span');
    nameBox.setAttribute('class','name');

    //duhet me e ndryshu kur te lidhim me databaze
    /*nameBox.innerHTML = '<%= user.name %> <%= user.lastName %>' ;*/
    divBox.appendChild(nameBox);

    document.querySelector('.grid-container').appendChild(divBox);

    return divBox;
}

function gotIceCandidate(fromId, candidate) {
    console.log('abc');
    connections[fromId].addIceCandidate(new RTCIceCandidate(candidate)).catch(handleError);
}

function startLocalStream() {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(getUserMediaSuccess)
        .then(connectSocketToSignaling).catch(handleError);
}

function connectSocketToSignaling() {
    const socket = io.connect('http://localhost:3000', { secure: true });
    localUserId = socket.id;
    mic_state[localUserId] = false;
    video_state[localUserId] = false;

    socket.on('connect', () => {
        localUserId = socket.id;
        mic_state[localUserId] = false;
        video_state[localUserId] = false;

        console.log('localUser', localUserId);
        socket.on('user-joined', (data) => {
            gridView();
            const clients = data.clients;
            const joinedUserId = data.joinedUserId;
            console.log(joinedUserId, ' joined');
            perdoruesit = clients;
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
                console.log('abc');
                if (data.count >= 2) {
                    console.log('1');
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

        socket.on("mc-changes-return", (data) => {
            mic_state = data.mic;
            video_state = data.vid;

            /*console.log(mic_state);*/

            const clients = data.clients;

            if (Array.isArray(clients) && clients.length > 0)
            {
                clients.forEach((userId) =>
                {
                    manage_voice(userId);
                });
            }
        })

        socket.on("sql_config", (data) => {
            login_table = data.res;
            console.log(login_table[0]['name']);
        })
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
                                        console.log('2');
                                    })
                                    .catch(handleError);
                            }
                            console.log('3');
                        })
                        .catch(handleError);
                }
                break;

        }
    }
}

var z = 0;

function getUserMediaSuccess(mediaStream) {

    if(z==0)
    {
        localMediaStream = mediaStream;
        mediaStream.getVideoTracks()[0].enabled = false;
        mediaStream.getAudioTracks()[0].enabled = false;
    }

    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
    console.log(mediaStream);
    z++;
}

function handleError(e) {
    console.log(e);
    alert('Something went wrong');
}

startLocalStream();