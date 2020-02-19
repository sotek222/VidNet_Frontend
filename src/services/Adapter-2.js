class APICommunicator {
  constructor(endpoint = "http://localhost:4000/api/v1"){
    this.endpoint = endpoint;
    this.token = localStorage.getItem("user_token");
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    this.authHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${this.token}`
    };
  }

  getUsers() {
    return fetch(`${this.endpoint}/users`).then(resp => resp.json());
  }

  getUser() {
    return fetch(`${this.endpoint}/profile`, {
      method: 'GET',
      headers: this.authHeaders
    }).then(response => response.json());
  }

}

export default APICommunicator;

