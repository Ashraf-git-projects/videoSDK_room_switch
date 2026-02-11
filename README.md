# VideoSDK Room Switching & Media Relay Demo
Live Demo : https://video-sdk-room-switch.vercel.app

## 📌 Overview

This project demonstrates seamless room switching using VideoSDK React SDK and explores the Media Relay (PK Host) feature conceptually as described in the Interactive Live Streaming documentation.

The application allows a participant to:
- Join Room A
- Switch to Room B
- Maintain clean lifecycle handling
- Handle media start/stop correctly

## 🚀 Project Setup

### 1️⃣ Clone Repository

git clone https://github.com/Ashraf-git-projects/videoSDK_room_switch.git

cd videosdk-room-switch

2️⃣ Install Dependencies

npm install
3️⃣ Run Development Server
npm run dev
4️⃣ Production Build
npm run build
🔁 Room Switching Implementation
Two rooms are created using VideoSDK Meetings API.

Switching Logic:
Room A and Room B IDs are generated using VideoSDK REST API.

MeetingProvider dynamically switches meetingId.

Seamless transition is achieved by:

Leaving current meeting

Updating meetingId

Rejoining without page reload

Key Concepts Used:
MeetingProvider

useMeeting

useParticipant

Proper lifecycle cleanup

Participant rendering via participants map

This ensures:

Camera and mic release properly

No reload required

Clean switching UX

🔄 Media Relay (Conceptual Implementation)
Media Relay (PK Host) was explored using:
requestMediaRelay()
stopMediaRelay()
Based on VideoSDK Interactive Live Streaming (ILS) documentation.

Intended Flow:
Host in Room A relays media to Room B

Destination meeting receives relay request

Upon acceptance, media is forwarded cross-room

Implementation Notes:
Relay handlers were implemented using:

onMediaRelayRequestReceived

onMediaRelayRequestResponse

onMediaRelayStarted

onMediaRelayStopped

⚠️ Limitations & Challenges
During development, the following challenges were encountered:

Relay functionality requires ILS (v2/rooms) endpoint.

Current React SDK version (0.6.8) triggers internal routerSpan error when relay events are enabled.

This appears to be an SDK-level tracing bug in the bundled package.

Due to this limitation, relay hooks were disabled to maintain application stability.

Despite this, full relay flow architecture was implemented and validated at the code level.

🔍 Normal Switching vs Media Relay
Feature	Normal Switching	Media Relay
Room Change	Leave & Join	Stay in source
Reload Required	No	No
Cross-room media	No	Yes
Use Case	Navigation	PK battles / cross-stream

🧠 Learnings
Understood difference between Meetings API (v1/meetings) and ILS Rooms API (v2/rooms)

Debugged SDK-level issue related to tracing instrumentation

Implemented clean lifecycle handling for RTC sessions

Built scalable switching architecture

🌐 Deployment
Live Demo: https://video-sdk-room-switch.vercel.app

📦 Tech Stack
React (Vite)

VideoSDK React SDK

WebRTC

Vercel

👤 Author
Ashraf Hussain Siddiqui
