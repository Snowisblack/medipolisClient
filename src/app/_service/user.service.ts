import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: StorageMap, private http: HttpClient) { }

  backendUrl="http://localhost:8080/rest/user"

  getAllUser(){
    return this.http.get(this.backendUrl + "/getAll");
  }

  getMyUser(username){
    return this.http.get(this.backendUrl + "/getMyUser/" + username);
  }

  setLocalUserData(user:User){
    localStorage.setItem('userData', JSON.stringify(user))
  }

  getLocalUserData(): User{
    return JSON.parse(localStorage.getItem('userData'));
  }

  clearLocalUserData(){
    localStorage.removeItem('userData');
  }
}
