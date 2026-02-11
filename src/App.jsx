import React, { useState , useEffect } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "./meetings/MeetingView";
import { VIDEO_SDK_TOKEN } from "./utils/token";
import { createMeeting } from "./utils/createMeeting";



function App() {
  const [roomA, setRoomA] = useState(null);
  const [roomB, setRoomB] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [isJoined, setIsJoined] = useState(false);


 const initializeRooms = async () => {
  const idA = await createMeeting(VIDEO_SDK_TOKEN);
  const idB = await createMeeting(VIDEO_SDK_TOKEN);

  setRoomA(idA);
  setRoomB(idB);
};


  const getCurrentRoomLabel = () => {
    if (meetingId === roomA) return "Room A";
    if (meetingId === roomB) return "Room B";
    return "None";
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>VideoSDK Room Switch Demo</h2>

      {!roomA && (
        <button onClick={initializeRooms}>
          Initialize Rooms
        </button>
      )}

      {roomA && (
        <>
          <div style={{ marginBottom: 15 }}>
            <button
              onClick={() => setMeetingId(roomA)}
              disabled={isJoined}
            >
              Join Room A
            </button>

            <button
              onClick={() => setMeetingId(roomB)}
              style={{ marginLeft: 10 }}
              disabled={isJoined}
            >
              Switch to Room B
            </button>
          </div>

          <div
            style={{
              padding: 10,
              background: "#f5f5f5",
              borderRadius: 6,
              marginBottom: 10,
            }}
          >
            <strong>Current Room:</strong> {getCurrentRoomLabel()}
            <br />
            <strong>Meeting Status:</strong>{" "}
            {isJoined ? "🟢 Joined" : "🔴 Not Joined"}
          </div>
        </>
      )}

      {meetingId && (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "Ashraf",
            mode: "SEND_AND_RECV", 
          }}
          token={VIDEO_SDK_TOKEN}
        >
          <MeetingView setIsJoined={setIsJoined} roomA={roomA}
  roomB={roomB} />
        </MeetingProvider>
      )}
    </div>
  );
}



export default App;
