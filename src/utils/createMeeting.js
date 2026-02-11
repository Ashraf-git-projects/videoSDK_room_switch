export const createMeeting = async (token) => {
  const res = await fetch("https://api.videosdk.live/v1/meetings", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.roomId;
};
