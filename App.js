import React, { useState, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

const App: () => React$Node = () => {

  const [localStream, setLocalStream] = useState(null);
  
  const [remoteStream1, setRemoteStream1] = useState(null);
  const [remoteStream2, setRemoteStream2] = useState(null);

  useEffect(() => {

    async function getUserMediaAndConnect() {
      const stream = await getUserMedia();
      setLocalStream(stream);
      connect1(stream);
      connect2(stream);
    }

    async function getUserMedia() {
      return mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "user"
        }
      });
    }

    async function connect1(stream) {
      const localPC1 = new RTCPeerConnection();
      localPC1.addStream(stream);

      const remotePC1 = new RTCPeerConnection();
      localPC1.onicecandidate = event => event.candidate === null
        ? console.log('local peer 1 candidate gathering ended')
        : console.log(event.candidate, remotePC1.addIceCandidate(event.candidate));
      
      remotePC1.onicecandidate = event => event.candidate === null
      ? console.log('remote peer 1 candidate gathering ended')
      : console.log(event.candidate, localPC1.addIceCandidate(event.candidate));

      remotePC1.onaddstream = event => {
        console.log('remotePC1.onaddstream:', event);
        setRemoteStream1(event.stream);
      }
      
      const offer = await localPC1.createOffer();
      await remotePC1.setRemoteDescription(offer);
      const answer = await remotePC1.createAnswer();
      await localPC1.setLocalDescription(offer);
      await localPC1.setRemoteDescription(answer);
      await remotePC1.setLocalDescription(answer);
    }

    async function connect2(stream) {
      const localPC2 = new RTCPeerConnection();
      localPC2.addStream(stream);

      const remotePC2 = new RTCPeerConnection();
      localPC2.onicecandidate = event => event.candidate === null
        ? console.log('local peer 1 candidate gathering ended')
        : console.log(event.candidate, remotePC2.addIceCandidate(event.candidate));
      
        remotePC2.onicecandidate = event => event.candidate === null
      ? console.log('remotePC2 candidate gathering ended')
      : console.log(event.candidate, localPC2.addIceCandidate(event.candidate));

      remotePC2.onaddstream = event => {
        console.log('remotePC2.onaddstream:', event);
        setRemoteStream2(event.stream);
      }
      
      const offer = await localPC2.createOffer();
      await remotePC2.setRemoteDescription(offer);
      const answer = await remotePC2.createAnswer();
      await localPC2.setLocalDescription(offer);
      await localPC2.setRemoteDescription(answer);
      await remotePC2.setLocalDescription(answer);
    }

    getUserMediaAndConnect();
  }, [])

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#FFAAAA', flex: 1 }}>
          {localStream !== null
            ? <RTCView
              streamURL={localStream.toURL()}
              mirror={true}
              style={{
                // position: 'absolute',
                zIndex: 0,
                width: '100%',
                height: '100%'
              }}
              objectFit='cover'
            />
            : <Text>Local</Text>}
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ backgroundColor: '#FFAA00', flex: 1 }}>
            {remoteStream1 !== null
              ? <RTCView
                streamURL={remoteStream1.toURL()}
                mirror={true}
                style={{
                  // position: 'absolute',
                  zIndex: 0,
                  width: '100%',
                  height: '100%'
                }}
                objectFit='cover'
              />
              : <Text>RemoteStrem1</Text>}
          </View>
          <View style={{ backgroundColor: '#00AAAA', flex: 1 }}>
          {remoteStream2 !== null
              ? <RTCView
                streamURL={remoteStream2.toURL()}
                mirror={true}
                style={{
                  // position: 'absolute',
                  zIndex: 0,
                  width: '100%',
                  height: '100%'
                }}
                objectFit='cover'
              />
              : <Text>RemoteStrem2</Text>}
          </View>
        </View>
      </View>
    </>
  );
};

export default App;
