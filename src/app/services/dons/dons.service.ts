import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonsService {

  constructor(private httpClient:HttpClient) { }

  userPaiement(data:any){
    return this.httpClient.post(environment.apiBaseUrl+'?action=pay', data);
  }

}
