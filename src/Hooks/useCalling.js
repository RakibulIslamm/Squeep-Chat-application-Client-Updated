import Peer from "peerjs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../utils/Socket.io/socket";


const useCalling = (currentUserId) => {
    const [peerId, setPeerId] = useState('');
    const [callerId, setCallerId] = useState('');
    const [caller, setCaller] = useState({});
    const [peerConn, setPeerConn] = useState({});
    const [callClose, setCallClose] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [isVideoCall, setIsVideoCall] = useState(false);
    const [users, setUsers] = useState({});
    const [mic, setMic] = useState(false);
    const [camera, setCamera] = useState(false);
    const [videoActive, setVideoActive] = useState(false);
    const remoteVideoRef = useRef();
    const currentVideoRef = useRef();
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);

    const adio = {
        sampleRate: 48,
        sampleSize: 16,
        channelCount: 1,
        volume: 1,
        latency: 0.003,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
    }

    useEffect(() => {
        socket.emit('room', currentUserId);
        const peer = new Peer();
        peer.on('open', (id) => {
            setPeerId(id);
            setPeerConn(peer);
        })
        if (callClose) {
            peer.destroy();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callClose]);

    useEffect(() => {
        if (remoteStreamRef.current) {
            remoteStreamRef.current.getAudioTracks()[0].enabled = false;
        }
    }, [])


    socket.on('id', ({ peerId, videoCall, caller }) => {
        setCallerId(peerId);
        setIsVideoCall(videoCall);
        setCaller(caller);
    })
    socket.on('videoActive', data => {
        setVideoActive(data);
    })

    useEffect(() => {
        socket.on('users', data => {
            setUsers(data);
        })
    }, [])

    const call = async (id, video, caller) => {
        setCallEnded(false);
        setIsVideoCall(video);
        setMic(true);
        setCamera(video);
        let getUserMedia = await navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: video, audio: adio }, (mediaStream) => {
            currentVideoRef.current.srcObject = mediaStream;
            localStreamRef.current = mediaStream;
            mediaStream.getAudioTracks()[0].enabled = false;
        })
        socket.emit('room', id);
        socket.emit('videoActive', video);
        peerConn.on('call', async call => {
            getUserMedia({ video: video, audio: adio }, (mediaStream) => {
                currentVideoRef.current.srcObject = mediaStream;
                call.answer(mediaStream)
                call.on('stream', remoteStream => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteStreamRef.current = remoteStream;
                })
                localStreamRef.current = mediaStream;
            })
        })
        socket.emit('id', ({ peerId, videoCall: video, caller }));
    }

    const callAnswer = async (remotePeerId) => {
        setCallEnded(false);
        setMic(true);
        setCamera(isVideoCall);
        let getUserMedia = await navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: isVideoCall, audio: adio }, async (mediaStream) => {
            socket.emit('videoActive', isVideoCall);
            currentVideoRef.current.srcObject = mediaStream;
            const call = peerConn.call(remotePeerId, mediaStream);
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteStreamRef.current = remoteStream;
            });
            localStreamRef.current = mediaStream;
        })

    }

    const toggleCamera = () => {
        let videoTrack = localStreamRef.current.getTracks().find(track => track.kind === 'video')
        if (videoTrack.enabled) {
            videoTrack.enabled = false
            setCamera(false);
            socket.emit('videoActive', false);
        }
        else {
            videoTrack.enabled = true;
            setCamera(true);
            socket.emit('videoActive', true);
        }
        // console.log(videoTrack.enabled);
    }
    const toggleMic = () => {
        let audioTrack = localStreamRef.current.getTracks().find(track => track.kind === 'audio')
        if (audioTrack.enabled) {
            audioTrack.enabled = false
            setMic(false);
        }
        else {
            audioTrack.enabled = true;
            setMic(true);
        }
    }



    const leaveCall = () => {
        setCallEnded(true)
        setCallClose(true);
        setCallerId('');
        setCaller({});
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    }

    return {
        remoteVideoRef,
        currentVideoRef,
        call,
        callAnswer,
        callerId,
        leaveCall,
        callEnded,
        setCallerId,
        localStreamRef,
        toggleCamera,
        toggleMic,
        isVideoCall,
        setIsVideoCall,
        mic,
        camera,
        remoteStreamRef,
        videoActive,
        caller,
        users,
        setCallEnded
    }
}

export default useCalling;