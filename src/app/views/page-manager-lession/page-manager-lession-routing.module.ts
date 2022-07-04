import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateLessiomComponent} from "./create-lessiom/create-lessiom.component";
import {ListClassComponent} from "../manager-class/list-class/list-class.component";
import {ListLessionComponent} from "./list-lession/list-lession.component";
import {UpdateLessionComponent} from "./update-lession/update-lession.component";

const routes: Routes = [
  {path: "create-lession",component:CreateLessiomComponent},
  {path: "update-lession/:id",component:UpdateLessionComponent},
  {path: "list-lession",component:ListLessionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageManagerLessionRoutingModule { }
