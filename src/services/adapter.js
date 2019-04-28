const API_URL = "http://localhost:4000/api/v1";

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
        elapsed_time: 0
      }
    })
  }).then(resp => resp.json());
};

const getTheatre = id => {
  return fetch(`${API_URL}/theatres/${id}`).then(resp => resp.json());
};

const updateTheatrePlaying = (theatre, playing) => {
  let { id, muted, elapsed_time } = theatre;
  return fetch(`${API_URL}/theatres/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playing: playing,
      muted: muted,
      elapsed_time: elapsed_time
    })
  }).then(resp => resp.json());
};

const updateTheatreMute = (theatre, muted) => {
  let { id, playing, elapsed_time } = theatre;
  return fetch(`${API_URL}/theatres/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playing: playing,
      muted: muted,
      elapsed_time: elapsed_time
    })
  }).then(resp => resp.json());
};

const updateTheatreTime = (theatre, time) => {
  let { id, playing, muted } = theatre;
  return fetch(`${API_URL}/theatres/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playing: playing,
      muted: muted,
      elapsed_time: time
    })
  }).then(resp => resp.json());
};

export default {
  createTheatre,
  getTheatre,
  updateTheatrePlaying,
  updateTheatreMute,
  updateTheatreTime
};
