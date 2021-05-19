const socket = io("/");

const room = Qs.parse(location)["pathname"].substring(1);
socket.emit("joinroom", { room });

socket.on("user-connected", (data) => {
  console.log("connection broadcast");
});

//////////////////////////

const localVideo = document.querySelector("#local-video");
const remoteVideoDiv = document.querySelector(".remote-video-div");

const createVideoElem = () => {
  const remoteVideo = document.createElement("video");
  remoteVideo.className = "remote-video";
  remoteVideoDiv.appendChild(remoteVideo);
};

/////////////////////

let localStream;
let remoteStream;

const getLocalStream = () => {
  return navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then((stream) => {
      localStream = stream;
      localVideo.srcObject = stream;
      localVideo.play();
    });
};

// getLocalStream();

/////////////////////

const config = {
  iceServers: [
    { url: "stun:stun.jap.bloggernepal.com:5349" },
    {
      url: "turn:turn.jap.bloggernepal.com:5349",
      username: "guest",
      credential: "somepassword",
    },
  ],
};

let PeerConnection;

const createPeerConnection = () => {
  PeerConnection = new RTCPeerConnection(config);
};
