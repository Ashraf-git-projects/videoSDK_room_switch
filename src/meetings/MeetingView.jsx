import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { VIDEO_SDK_TOKEN } from "../utils/token";
import { useEffect, useRef } from "react";

function ParticipantView({ participantId }) {
  const videoRef = useRef(null);
  const { webcamStream } = useParticipant(participantId);

  useEffect(() => {
    if (webcamStream && videoRef.current) {
      videoRef.current.srcObject = new MediaStream([
        webcamStream.track,
      ]);
      videoRef.current.play().catch(() => {});
    }
  }, [webcamStream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      width="300"
      style={{ border: "1px solid black" }}
    />
  );
}

function MeetingView({ setIsJoined }) {
  const {
    join,
    leave,
    participants,
  } = useMeeting({
    onMeetingJoined: () => {
      console.log("Meeting joined");
      setIsJoined(true);
    },
    onMeetingLeft: () => {
      console.log("Meeting left");
      setIsJoined(false);
    },
  });

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={join}>Join Meeting</button>
      <button onClick={leave} style={{ marginLeft: 10 }}>
        Leave Meeting
      </button>

      <div style={{ marginTop: 20 }}>
        {[...participants.keys()].map((participantId) => (
          <ParticipantView
            key={participantId}
            participantId={participantId}
          />
        ))}
      </div>
    </div>
  );
}


export default MeetingView;
