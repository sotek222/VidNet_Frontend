const API_URL = "http://localhost:3000/api/v1";

// will need to take more args in the future when the host is known, etc.
const createTheatre = url => {
  return fetch(`${API_URL}/theatres`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // hardcoded host, and chats for now
      host_id: 1,
      src: url,
      text_chat: false,
      audio_chat: false,
      video_chat: false
    })
  }).then(resp => resp.json());
};

const getTheatre = id => {
  return fetch(`${API_URL}/theatres/${id}`).then(resp => resp.json());
};

export default { createTheatre, getTheatre };
