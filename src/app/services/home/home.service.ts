import { Injectable } from '@angular/core';
import{ HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient:HttpClient) { }

  getRecentsPosts(limit=0, type="all"){
    return this.httpClient.get(environment.apiBaseUrl+'?action=postsHome&type='+type+'&limit='+limit);
  }

  createPost(post:any){
    var myFormData = new FormData();
    myFormData.append('image', post.image);
    myFormData.append('titre', post.titre);
    myFormData.append('auteur', post.auteur);
    myFormData.append('tag', post.tag);
    myFormData.append('type', post.type);
    myFormData.append('id_categories', post.id_categories);
    myFormData.append('description', post.description);
    return this.httpClient.post(environment.apiBaseUrl+'?action=createPost', myFormData);
  }

  libelleCategories(){
    return this.httpClient.get(environment.apiBaseUrl+'?action=libelleCategories');
  }

  deletePost(id:number){
    return this.httpClient.get(environment.apiBaseUrl+'?action=deletePost&id='+id);
  }

  editPost(editPostData:any){
    return this.httpClient.post(environment.apiBaseUrl+'?action=editPost', editPostData);
  }

  getQuantity(type="all"){
    return this.httpClient.get(environment.apiBaseUrl+'?action=getQuantity&type='+type);
  }
}
