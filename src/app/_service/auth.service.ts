import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:8080"

  register(username, password, passwordConfirm){
    return this.http.post(this.backendUrl + '/rest/user/register', {username, password, passwordConfirm}).pipe();
  }

  login(username, password){
    return this.http.put(this.backendUrl + '/rest/user/login', {username, password}).pipe();
  }
}
