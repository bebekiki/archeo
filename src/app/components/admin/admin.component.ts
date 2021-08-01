import { Component, OnInit } from '@angular/core';
import { HomeService} from '../../services/home/home.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private homeService:HomeService) { }
  posts = Array();
  categories = Array();
  messageError = '';
  messageSuccess='';
  currentPost:any;
  // display='none'; 
  filedata:any;
  paginations = [];
  paginateId = 1;
  allQuantity = 4;
  qte:number;

  ngOnInit(): void {
    this.getCategories();
    this.currentPost = '';
  }

  paginateNumber(qte:number){
    this.paginations = [];
    if((qte/4)<=1){
      this.paginations.push(1);
    }else{
      for(let i=1;i<=Math.ceil(qte/4);i++){
        this.paginations.push(i);
      }
    }
  }

  getQuantity(type="all"){
    this.homeService.getQuantity(type).subscribe(
      res=>{
        this.qte = res['qte'];
        this.paginateNumber(this.qte);
      },
      err=>{
        console.log('erreur');
      }
    )
  }

  getAllPosts(type="all",limit=4){
    if(limit == 4){
      this.paginateId = 1;
    }
    localStorage.setItem('type', type);
    this.getQuantity(type);
    this.homeService.getRecentsPosts(limit, type).subscribe(
      res=>{
        this.posts = res['posts'];
      },
      err=>{
        console.log('erreure');
      }
    )
  }
  
  getCategories(){
    this.homeService.libelleCategories().subscribe(
      res=>{
        this.categories = res['categories'];
        this.getAllPosts();
      },
      err=>{
        console.log('erreure');
      }
    )
  }

  paginatePosts(limit:number, nextPage:number){
    this.paginateId = nextPage;
    this.getAllPosts(localStorage.getItem('type'),limit);
  }

  fileEvent(e){
    this.filedata = e.target.files[0];
  }
  
  createPost(form:NgForm){
    form.value.image = this.filedata;
    this.homeService.createPost(form.value).subscribe(
      res=>{
        if(res['error'] == false){
          document.getElementById('closeModal').click();
          this.messageSuccess = res['data'];
          this.messageError = '';
          this.getAllPosts();
        }else{
          document.getElementById('closeModal').click();
          this.messageError = res['data'];
          this.messageSuccess = '';
        }
      },
      err=>{
        document.getElementById('closeModal').click();
        this.messageError = 'Création échouée!!!';
        this.messageSuccess = '';
      }
    )
  }


  deletePost(id:number){
    this.homeService.deletePost(id).subscribe(
      res=>{
        if(res['error'] == false){
          this.messageSuccess = res['message'];
          this.messageError = '';
          this.getAllPosts();
        }else{
          this.messageError = 'Le post n\'a pas pu être supprimé';
          this.messageSuccess = '';
        }
      },
      err=>{
        this.messageError = 'Le post n\'a pas pu être supprimé';
        this.messageSuccess = '';
      }
    )
  }

  getCurrentPost(post:any){
    this.currentPost = post;
  }

  editPost(form:NgForm){
    this.homeService.editPost(form.value).subscribe(
      res=>{
        if(res['error'] == false){
          alert('yes');
          this.messageSuccess = res['message'];
          this.messageError = '';
          this.getAllPosts();
        }else{
          alert('non');
          this.messageError = 'Le post n\'a pas pu être éditer';
          this.messageSuccess = '';
        }
      },
      err=>{
        alert('no');
        this.messageError = err;
        this.messageSuccess = '';
        console.log(err);
      }
    )
    document.getElementById('closeModal').click();
  }

}
