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
  private roles: string[] = [];

  login(identifiant: string, motDePasse: string) {
    return this.http.post(this.baseUri+'login', {login: identifiant, password: motDePasse})
  }

  subscribe() {

  }

  setSecret(secret: string){
    this.secret = secret;
    try {
      this.decodedToken = jwtDecode(secret);
      this.roles = this.decodedToken.roles;
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

  hasRole(role: string) {
    return this.roles.includes(role);
  }

}
