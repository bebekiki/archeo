import { Component, OnInit } from '@angular/core';
import { DecouvertesService} from '../../services/decouvertes/decouvertes.service';

@Component({
  selector: 'app-decouvertes',
  templateUrl: './decouvertes.component.html',
  styleUrls: ['./decouvertes.component.css']
})
export class DecouvertesComponent implements OnInit {

  constructor(private decouvertesService:DecouvertesService) { }

  categories = Array();
  allQuantity:number;
  posts = Array();
  selectedItemId = 0; 
  paginateId = 1;
  paginations = [];
  categoriesId:number;
  qteCategories:number;


  ngOnInit(): void {
    this.getCategories();
    // this.getAllPosts();
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
    this.decouvertesService.getAllCategories('decouvertes').subscribe(
      res=>{
        this.allQuantity = res['quantite'];
        this.categories = res['categories'];
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
    this.decouvertesService.getAllPosts(id,'decouvertes',limit).subscribe(
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
