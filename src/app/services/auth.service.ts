import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUri = 'http://localhost:4501/';
  public secret?: string;
  public decodedToken?: any;

  login(login: string, password: string) {
    return this.http.post(this.baseUri+'login', {login, password})
  }

  subscribe() {

  }

  setSecret(secret: string){
    this.secret = secret;
    try {
      this.decodedToken = jwtDecode(secret);
      localStorage.setItem("token", this.secret);
    }
    catch {
      this.disconnect();
    }
  }

  disconnect() {
    this.secret = undefined;
    this.decodedToken = undefined;
    localStorage.removeItem("token");
  }

}
