import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../pagelogin/login/login.component";
import {DetailmarkComponent} from "./detailmark/detailmark.component";
import {UpdateMarkStudentComponent} from "./update-mark-student/update-mark-student.component";
import {UpdateDetailStudentComponent} from "./update-detail-student/update-detail-student.component";
import {QuestionComponent} from "../question/question.component";
import {ListClassMarkComponent} from "./list-class-mark/list-class-mark.component";

const routes: Routes = [{
  path: 'detailmark',
  component: DetailmarkComponent,
}, {
  path: 'updatemark',
  component: UpdateMarkStudentComponent
}
  , {
    path: 'updatemark/:id',
    component: UpdateDetailStudentComponent
  }, {
    path: 'listmark',
    component: ListClassMarkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagemarkRoutingModule {
}
