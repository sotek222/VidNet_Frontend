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

  parseData(response){
    return response.json();
  }


  getUsers() {
    return fetch(`${this.endpoint}/users`).then(this.parseData);
  }

  getUser() {
    return fetch(`${this.endpoint}/profile`, this.fetchOptions('GET', true))
      .then(this.parseData);
  }

  loginUser(user) {
    return fetch(`${this.endpoint}/login`, this.fetchOptions('POST', false, { user }))
      .then(this.parseData);
  }

  createUser(user) {
    return fetch(`${this.endpoint}/users`, this.fetchOptions('POST', false, { user }))
      .then(this.parseData)
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
      .then(this.parseData);
  }

  getTheatre(id){
    return fetch(`${this.endpoint}/theatres/${id}`, this.fetchOptions())
      .then(this.parseData)
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
      .then(this.parseData);
  }

  sendText(text){
    return fetch(`${this.endpoint}/texts`, this.fetchOptions('POST', false, { text }))
      .then(this.parseData);
  }

  deleteFriendship(userId, friendId){
    return fetch(`${this.endpoint}/friends/${friendId}/${userId}`, this.fetchOptions('DELETE', true))
      .then(this.parseData);
  }

  addFriend(userId, friendId){
    const body = {
      friender_id: userId,
      friendee_id: friendId
    };

    return fetch(`${this.endpoint}/friends`, this.fetchOptions('POST', true, body))
      .then(this.parseData);
  }


  getFilteredTheatres(){
    return fetch(`${this.endpoint}/filtered`)
      .then(this.parseData);
  }

  updateUser(id, userInfo){
    return fetch(`${this.endpoint}/users/${id}`, this.fetchOptions('PATCH', true, userInfo))
    .then(this.parseData);
  }

  deleteUser(id){
    return fetch(`${this.endpoint}/users/${id}`, this.fetchOptions('DELETE', true))
  }
  
}

export default APICommunicator;
// Possible abstraction to use for multiple resources
  // getResource(resourceName, auth = false, id = ''){
  //   return fetch(`${this.endpoint}/${resourceName}/${id}`, this.fetchOptions('GET', true))
  //     .then(this.parseData);
  // }