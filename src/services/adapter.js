const API_URL = "http://localhost:3000/api/v1";

// will need to take more args in the future when the host is known, etc.
const createTheatre = url => {
  return fetch(`${API_URL}/theatres`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // hardcoded host, privacy, and chats for now, the rest starts out like this.
      theatre: {
        host_id: 1,
        src: url,
        text_chat: false,
        audio_chat: false,
        video_chat: false,
        is_public: true,
        playing: false,
        muted: false,
        volume: 1.0,
        elapsed_time: 0
      }
    })
  }).then(resp => resp.json());
};

const getTheatre = id => {
  return fetch(`${API_URL}/theatres/${id}`).then(resp => resp.json());
};

const updateTheatrePlaying = (theatre, playing) => {
  let {
    id,
    host_id,
    src,
    text_chat,
    audio_chat,
    video_chat,
    is_public,
    muted,
    volume,
    elapsed_time
  } = theatre;
  return fetch(`${API_URL}/theatres/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      theatre: {
        host_id: host_id,
        src: src,
        text_chat: text_chat,
        audio_chat: audio_chat,
        video_chat: video_chat,
        is_public: is_public,
        playing: playing,
        muted: muted,
        volume: volume,
        elapsed_time: elapsed_time
      }
    })
  }).then(resp => resp.json());
};

export default { createTheatre, getTheatre, updateTheatrePlaying };
