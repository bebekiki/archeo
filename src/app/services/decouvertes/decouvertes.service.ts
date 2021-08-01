import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecouvertesService {

  constructor(private httpClient:HttpClient) { }

  //fonction pour toutes les catégories
  getAllCategories(data:string){
    return this.httpClient.get(environment.apiBaseUrl+'?action=categories&type='+data);
  }

  getAllPosts(id:number, type:string,limit:number){
    return this.httpClient.get(environment.apiBaseUrl+'?action=posts&categories='+id+'&type='+type+'&limit='+limit);
  }

  getDetailPosts(id:number){
    return this.httpClient.get(environment.apiBaseUrl+'?action=detailPosts&postId='+id);
  }

}
