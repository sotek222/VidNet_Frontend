const API_URL = "http://localhost:4000/api/v1";

// CURRENT FIX:
// updateTheatrePlaying,
//   updateTheatreMute,
//   updateTheatreTime,

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
      "Content-Type": "application/json",
      seeking: "seeking"
    },
    body: JSON.stringify({
      playing: playing,
      muted: muted,
      elapsed_time: time
    })
  }).then(resp => resp.json());
};

const updateUser = (id, userInfo) => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      image: userInfo.image,
      email: userInfo.email
    })
  }).then(resp => resp.json());
};

const deleteUser = id => {
  let token = localStorage.getItem("user_token");
  return fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

const addFriend = (userId, friendId) => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      friender_id: userId,
      friendee_id: friendId
    })
  }).then(resp => resp.json());
};

const getFriends = () => {
  let token = localStorage.getItem("user_token");
  return fetch(`${API_URL}/friends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json());
};

const deleteFriendship = id => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/friends/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json());
};

const createMessage = (inboxId, senderId, link) => {
  let token = localStorage.getItem("user_token");

  fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      message: {
        sender_id: senderId,
        inbox_id: inboxId,
        link: link,
        content: "lets watch!"
      }
    })
  }).then(resp => resp.json());
};

const getChat = chatId => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/chats/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json());
};

const sendText = (userId, chatId, content) => {
  return fetch(`${API_URL}/texts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: {
        user_id: userId,
        chat_id: chatId,
        content: content
      }
    })
  }).then(resp => resp.json());
};

const getUserFriends = userId => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/get_my_friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: userId
    })
  }).then(resp => resp.json());
};

const getFilteredTheatres = () => {
  return fetch(`${API_URL}/filtered`).then(resp => resp.json());
};

const deleteMessage = id => {
  let token = localStorage.getItem("user_token");

  return fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json());
};

export default {
  getFilteredTheatres,
  updateTheatrePlaying,
  updateTheatreMute,
  updateTheatreTime,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  getUserFriends,
  deleteFriendship,
  createMessage,
  deleteMessage,
  getChat,
  sendText
};
