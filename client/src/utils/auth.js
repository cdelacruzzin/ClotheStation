import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // return true if token not expired
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // decode token to get expiration set by server
    const decoded = decode(token);
    // token is expired and returns true if expiration is less than current time(in seconds)
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("_id_token");
      return true;
    }
    // return false if token hasn't passed the expiration time
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

//   set id token in localstrage if logged in
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

//   after loggin out remove id token
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
