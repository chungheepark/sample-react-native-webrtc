# ReactNative WebRTC sample

## version

```json
{
  ...
  "react-native": "0.61.2",
  "react-native-webrtc": "^1.75.1"
  ...
}
```

## app 설명

1. 카메라 프론트 열어서 제일 크게 레이아웃 잡음
2. 그 밑에 2개 레이아웃에 RTCPeerConnection 접속용으로 2개 만들어서 카메라 붙임

네트워크 연동은 안했으므로 인터넷 트래픽은 발생하지 않겠지?

## Trouble shooting

### iOS

1. RN61이라서 앞에 몇단계 건너 뛰었음
2. Step4 부터 진행했음.
3. framework는 추가 안하고 `libc.tbd`, `libc++.tbd`, `libsqlite3.tbd` 파일만 추가했음.
4. permission 추가

ios 권한: info.plist

```xml
<key>NSCameraUsageDescription</key>
<string>Camera Permission</string>
<key>NSMicrophoneUsageDescription</key>
<string>Microphone Permission</string>
```

5. Bitcode 뭐시기 막 에러 발생했었음.

해결: Project -> Build Settings -> Build Options -> Enable Bitcode : No

### Android

RN61이라서 퍼미션만 추가하니 됨

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus"/>

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
