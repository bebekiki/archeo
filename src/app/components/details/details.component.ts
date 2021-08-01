import { Component, OnInit } from '@angular/core';
import { DecouvertesService} from '../../services/decouvertes/decouvertes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../models/posts/post.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post = new Post();
  title:string;

  constructor(
    private decouvertesService:DecouvertesService,
    private activatedRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.getDetail(params['id']);
      this.title = params['title'];
    })
  }

  getDetail(id:number){
    this.decouvertesService.getDetailPosts(id).subscribe(
      res=>{
        if(res['error']){
          this.router.navigate(['/decouvertes']);
        }
        this.post = res['post'];
        console.log(this.post);
      },
      err=>{
        this.router.navigate(['/decouvertes']);
      }
    )
  }

}
