import axios from "axios";

export class Client {
  BASE_URL = "https://danit-final-twitter-8f32e99a3dec.herokuapp.com";

  constructor() {
    this.session = axios.create({ baseURL: this.BASE_URL });
    this.get = this.session.get;
    this.post = this.session.post;
    this.delete = this.session.delete;
    this.put = this.session.put;
  }

  setAccessToken(accessToken) {
    this.session.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
