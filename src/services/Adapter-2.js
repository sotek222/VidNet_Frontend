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
    return fetch(`${this.endpoint}/profile`, this.fetchOptions('GET', true)).then(response => response.json());
  }

  loginUser(user) {
    return fetch(`${this.endpoint}/login`, this.fetchOptions('POST', false, { user })).then(response => response.json());
  }

}

export default APICommunicator;