import { TinTuc } from './../../core/model/TinTuc';
import { NewsService } from './../../services/news/news.service';
import { Component } from '@angular/core'; 

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { 
  favourite = true;
  listNews: TinTuc[] = [];
  constructor(private _newsService: NewsService) { 
  } 
   ngOnInit(): void {
    this._newsService.getAllNews().subscribe(
      response => { 
        this.listNews = response.splice(0,6);
      }
    )
  }

  image: Array<string> = [
    "assets/images/slidebar.png",
    "assets/images/public/logo.png",
    "assets/images/public/logo.png"
  ];
  aboutus_image: string = "assets/images/aboutus.png";
  activityImageUrl: string = "assets/images/activity.png";
  
}
