import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListStudentComponent} from "./list-student/list-student.component";
import {CreateStudentComponent} from "./create-student/create-student.component";
import {AdminGuard} from "../../core/guards/admin.guard";

const routes: Routes = [{
  path: "students", component: ListStudentComponent, canActivate: [AdminGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerStudentRoutingModule {
}
