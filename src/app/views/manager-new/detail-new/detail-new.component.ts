import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NewsService} from "../../../services/news/news.service";
import {TinTuc} from "../../../core/model/TinTuc";

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.scss']
})
export class DetailNewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private newService: NewsService) {
  }

  id = 0;
tintuc!:TinTuc;
  ngOnInit(): void {
    this.id = this.data;
    this.newService.getTinTucById(this.id).subscribe((data)=>{
      this.tintuc=data;
    })
  }


}
