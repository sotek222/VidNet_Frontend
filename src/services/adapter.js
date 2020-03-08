const API_URL = "http://localhost:4000/api/v1";

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
  createMessage,
  deleteMessage,
};
