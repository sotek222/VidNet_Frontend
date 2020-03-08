const API_URL = "http://localhost:4000/api/v1";

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
  updateUser,
  deleteUser,
  getFriends,
  getUserFriends,
  createMessage,
  deleteMessage,
};
