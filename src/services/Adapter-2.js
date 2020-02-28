class APICommunicator {
  constructor(endpoint = "http://localhost:4000/api/v1"){
    this.endpoint = endpoint;
    this.token = localStorage.getItem("user_token");
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.authHeaders = {
      ...this.headers,
      Authorization: `Bearer ${this.token}`
    };

    this.fetchOptions = function(httpVerb = 'GET', auth = false, body){
      if(httpVerb === 'GET' || httpVerb === 'DELETE') {
        return {
          method: httpVerb,
          headers: auth ? this.authHeaders : this.headers
        } 
      } else {
        return { 
          method: httpVerb,
          headers: auth ? this.authHeaders : this.headers,
          body: body ? JSON.stringify(body) : {}
        }
      };
      
    };
  }

  getUsers() {
    return fetch(`${this.endpoint}/users`).then(resp => resp.json());
  }

  getUser() {
    return fetch(`${this.endpoint}/profile`, this.fetchOptions('GET', true))
    .then(response => response.json());
  }

  loginUser(user) {
    return fetch(`${this.endpoint}/login`, this.fetchOptions('POST', false, { user }))
    .then(response => response.json());
  }

  createUser(user) {
    return fetch(`${this.endpoint}/users`, this.fetchOptions('POST', false, { user }))
    .then(response => response.json())
  }

  createTheatre(theatreInfo, userId) {
    // If these values are defaulted we can set this up in the backend instead.
    const body = {
      theatre: {
        host_id: userId,
        src: theatreInfo.url,
        text_chat: theatreInfo.chatChecked,
        audio_chat: false,
        video_chat: false,
        is_public: theatreInfo.public,
        playing: false,
        muted: false,
        elapsed_time: 0,
        title: theatreInfo.title
      }
    };
    
    return fetch(`${this.endpoint}/theatres`, this.fetchOptions('POST', true, body))
    .then(response => response.json());
  }

  getTheatre(id){
    return fetch(`${this.endpoint}/theatres/${id}`, this.fetchOptions())
    .then(response => response.json())
  }

  updateTheatre(theatre){
    return fetch(`${this.endpoint}/theatres/${theatre.id}`, this.fetchOptions('PATCH', false, theatre))
  }

  updateTheatreTime(theatre){
    const options = { 
      method: 'PATCH', 
      headers: { ...this.headers, seeking: "seeking" }, 
      body: JSON.stringify(theatre) 
    };
    return fetch(`${this.endpoint}/theatres/${theatre.id}`, options) 
  }

  getChat(id){
    return fetch(`${this.endpoint}/chats/${id}`, this.fetchOptions('GET', true))
    .then(response => response.json());
  }

  sendText(text){
    return fetch(`${this.endpoint}/texts`, this.fetchOptions('POST', false, { text }))
    .then(response => response.json());
  }

  deleteFriendship(id){
    return fetch(`${this.endpoint}/friends/${id}`, this.fetchOptions('DELETE', true))
    .then(response => response.json());
  }

}

export default APICommunicator;
