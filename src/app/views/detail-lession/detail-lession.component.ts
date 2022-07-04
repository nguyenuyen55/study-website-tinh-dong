import { BaiGiang } from 'src/app/core/model/BaiGiang';
import { LessionService } from '../../services/lession/lession.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-detail-lession',
  templateUrl: './detail-lession.component.html',
  styleUrls: ['./detail-lession.component.scss']
})
export class DetailLessionComponent implements OnInit {

  private routeSub: Subscription | undefined;
  lession: BaiGiang[] = [];
  constructor(private route: ActivatedRoute,
              private _lessionService: LessionService,
              private sanitizer: DomSanitizer) { }
  id=0;
  link: string = '';
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this._lessionService.getLessionById(this.id).subscribe(response => {this.lession.push(response);
    this.link=response.fileVideo;
    });
  }
  transform() {
// @ts-ignore
    let url = this.link;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}
