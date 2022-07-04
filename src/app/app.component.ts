import { NewsService } from './services/news/news.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'study-website';
  constructor(private _scheduleService: ScheduleService, private _newsService: NewsService) { }

  ngOnInit(): void {
    this._scheduleService.getAllBlock().subscribe(response => {
      localStorage.setItem('dataBlock', JSON.stringify(response));
    })
    this._newsService.getAllNews().subscribe(
      response => {
        localStorage.setItem('dataNews', JSON.stringify(response));

      }
    )
  }
}
