import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BaiGiang} from "../../../core/model/BaiGiang";
import {ActivatedRoute} from "@angular/router";
import {LessionService} from "../../../services/lession/lession.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-lession-admin',
  templateUrl: './detail-lession-admin.component.html',
  styleUrls: ['./detail-lession-admin.component.scss']
})
export class DetailLessionAdminComponent implements OnInit {

  private routeSub: Subscription | undefined;
  lession: BaiGiang[] = [];
  constructor(private route: ActivatedRoute,
              private _lessionService: LessionService,
              private sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  link: string = '';
  ngOnInit() {
    this._lessionService.getLessionById(this.data).subscribe(response => {this.lession.push(response);
      this.link=response.fileVideo;
    });
  }
  transform() {
// @ts-ignore
    let url = this.link;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}
