import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private httpClient:HttpClient) { }

  //service création de compte
  createNewUser(user:User){
    return this.httpClient.post(environment.apiBaseUrl+'?action=register', user);
  }

  //service de connexion
  login(data:any){
    return this.httpClient.post(environment.apiBaseUrl+'?action=login', data);
  }

  //fonction pour envoyer un message à l'association
  sendMesg(data:any){
    return this.httpClient.post(environment.apiBaseUrl+'?action=sendMsg', data);
  }

}
