import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  constructor(private http: HttpClient) { }

  backendUrl= "http://localhost:8080/rest/penalty"

  getAllPenalties(){
    return this.http.get(this.backendUrl + '/getAll');
  }

  submitPen(username, id){
    return this.http.put(this.backendUrl + "/addPenalty/" + username + "/" + id, {}).pipe();
  }

  clearPens(username){
    return this.http.put(this.backendUrl + "/clearPens/" + username, {}).pipe();
  }
}
