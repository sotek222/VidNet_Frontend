const API_URL = "http://localhost:4000/api/v1";
let token = localStorage.getItem("user_token");

const getUsers = () => {
  return fetch(`${API_URL}/users`).then(resp => resp.json());
};

const loginUser = (username, password) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  }).then(resp => resp.json());
};

const createTheatre = (url, id) => {
  return fetch(`${API_URL}/theatres`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      //  hard coded privacy, and chats for now, the rest starts out like this.
      theatre: {
        host_id: id,
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

const getUser = () => {
  return fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json());
};

const updateUser = (id, userInfo) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      image: userInfo.image,
      email: userInfo.email,
      location: userInfo.location
    })
  }).then(resp => resp.json());
};

const deleteUser = id => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

const createUser = (username, email, image, password) => {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        email: email,
        image: image,
        password: password
      }
    })
  }).then(resp => resp.json());
};

export default {
  createTheatre,
  getTheatre,
  updateTheatrePlaying,
  updateTheatreMute,
  updateTheatreTime,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getUsers
};
