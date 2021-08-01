import { Component, OnInit } from '@angular/core';
import { HomeService} from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts = Array();

  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.getRecentsPosts();
  }

  getRecentsPosts(){
    this.homeService.getRecentsPosts(3).subscribe(
      res=>{
        this.posts = res['posts'];
      },
      err=>{
        console.log('erreure');
      }
    )
  }

}
