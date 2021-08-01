import { Component, OnInit } from '@angular/core';
import { DecouvertesService} from '../../services/decouvertes/decouvertes.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  categories = Array();
  allQuantity:number;
  posts = Array();
  selectedItemId = 0; 
  paginateId = 1;
  paginations = [];
  categoriesId:number;
  qteCategories:number;

  constructor(private decouvertesService:DecouvertesService) { }

  ngOnInit(): void {
    // this.getAllPosts();
    this.getCategories();
  }

  paginateNumber(qte:number){
    if((qte/4)<=1){
      this.paginations.push(1);
    }else{
      for(let i=1;i<=Math.ceil(qte/4);i++){
        this.paginations.push(i);
      }
    }
  }

  getCategories(){
    this.decouvertesService.getAllCategories('publications').subscribe(
      res=>{
        this.categories = res['categories'];
        this.allQuantity = res['quantite'];
        this.getAllPosts(0,this.allQuantity);
      },
      err=>{
        console.log(err);
      }
    )
  }

  getAllPosts(id=0,qte=0,limit=4){
    
    this.categoriesId = id;
    this.selectedItemId = id;
    this.qteCategories = qte;
    if(limit == 4){
      this.paginateId = 1;
    }
    this.paginations = [];
    this.paginateNumber(qte);
    this.decouvertesService.getAllPosts(id,'publications',limit).subscribe(
      res=>{
        this.posts = res['posts'];
      },
      err=>{
        console.log(err);
      }
    )
  }


  paginatePosts(limit:number, nextPage:number){
    if(limit > 4){
      if(localStorage.getItem('connected') == 'true'){
        this.paginateId = nextPage;
        this.getAllPosts(this.categoriesId,this.qteCategories,limit);
      }else{
        document.getElementById("connexion").click();
      }
    }else{
      this.paginateId = nextPage;
      this.getAllPosts(this.categoriesId,this.qteCategories,limit);
    }
  }

}
