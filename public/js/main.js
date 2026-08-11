'use strict';

(function () {
  const mediaStreamConstraints = { video: true, audio: true };
  const localVideo = document.getElementById('localVideo');
  const micBox = document.getElementById('mic-icon');
  const camBox = document.getElementById('cam-icon');
  const userContainer = document.getElementById('view-container');

  let localMediaStream;
  let localUserId;
  const connections = {};
  const peerConnectionConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  const socket = window.attendanceSocket;
  if (!socket) {
    console.error('Socket not initialized — load client.js before main.js');
    return;
  }

  function createUserBox(userId) {
    let box = document.getElementById(userId);
    if (box) {
      return box;
    }
    box = document.createElement('div');
    box.className = 'grid-item';
    box.id = userId;
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = userId.slice(0, 8);
    box.appendChild(name);
    userContainer.appendChild(box);
    if (typeof gridView === 'function') {
      gridView();
    }
    return box;
  }

  function gotRemoteStream(event, userId) {
    const remoteVideo = document.createElement('video');
    remoteVideo.setAttribute('data-socket', userId);
    remoteVideo.srcObject = event.streams ? event.streams[0] : event.stream;
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;
    createUserBox(userId).appendChild(remoteVideo);
  }

  function getUserMediaSuccess(stream) {
    localMediaStream = stream;
    if (localVideo) {
      localVideo.srcObject = stream;
    }
    Object.keys(connections).forEach((id) => {
      const senders = connections[id].getSenders();
      stream.getTracks().forEach((track) => {
        const sender = senders.find((s) => s.track && s.track.kind === track.kind);
        if (sender) {
          sender.replaceTrack(track);
        } else {
          connections[id].addTrack(track, stream);
        }
      });
    });
  }

  function createPeerConnection(userId) {
    if (connections[userId]) {
      return connections[userId];
    }
    const pc = new RTCPeerConnection(peerConnectionConfig);
    connections[userId] = pc;

    if (localMediaStream) {
      localMediaStream.getTracks().forEach((track) => pc.addTrack(track, localMediaStream));
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signaling', {
          type: 'candidate',
          toId: userId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => gotRemoteStream(event, userId);
    return pc;
  }

  async function createOffer(userId) {
    const pc = createPeerConnection(userId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('signaling', {
      type: 'offer',
      toId: userId,
      description: pc.localDescription,
    });
  }

  socket.on('user-joined', async (data) => {
    localUserId = data.joinedUserId;
    const clients = (data.clients || []).filter((id) => id !== localUserId);
    for (const id of clients) {
      await createOffer(id);
    }
  });

  socket.on('user-left', (userId) => {
    if (connections[userId]) {
      connections[userId].close();
      delete connections[userId];
    }
    const box = document.getElementById(userId);
    if (box) {
      box.remove();
    }
    if (typeof gridView === 'function') {
      gridView();
    }
  });

  socket.on('signaling', async (data) => {
    const fromId = data.fromId;
    if (!fromId || fromId === localUserId) {
      return;
    }
    const pc = createPeerConnection(fromId);

    try {
      if (data.type === 'offer' && data.description) {
        await pc.setRemoteDescription(data.description);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('signaling', {
          type: 'answer',
          toId: fromId,
          description: pc.localDescription,
        });
      } else if (data.type === 'answer' && data.description) {
        await pc.setRemoteDescription(data.description);
      } else if (data.type === 'candidate' && data.candidate) {
        await pc.addIceCandidate(data.candidate);
      }
    } catch (err) {
      console.error('signaling error', err);
    }
  });

  window.turnOnOffCam = function turnOnOffCam() {
    if (!localMediaStream) {
      return;
    }
    const track = localMediaStream.getVideoTracks()[0];
    if (!track) {
      return;
    }
    track.enabled = !track.enabled;
    if (camBox) {
      camBox.setAttribute('src', track.enabled ? '/img/on-video.png' : '/img/off-video.png');
    }
    socket.emit('micCamChange', {
      mic: localMediaStream.getAudioTracks()[0] ? localMediaStream.getAudioTracks()[0].enabled : false,
      vid: track.enabled,
    });
  };

  window.turnOnOffMic = function turnOnOffMic() {
    if (!localMediaStream) {
      return;
    }
    const track = localMediaStream.getAudioTracks()[0];
    if (!track) {
      return;
    }
    track.enabled = !track.enabled;
    if (micBox) {
      micBox.setAttribute('src', track.enabled ? '/img/unmuted.png' : '/img/muted.png');
    }
    socket.emit('micCamChange', {
      mic: track.enabled,
      vid: localMediaStream.getVideoTracks()[0] ? localMediaStream.getVideoTracks()[0].enabled : false,
    });
  };

  navigator.mediaDevices
    .getUserMedia(mediaStreamConstraints)
    .then(getUserMediaSuccess)
    .catch((err) => {
      console.warn('Camera/mic unavailable — continuing without media:', err.message);
    });
})();
