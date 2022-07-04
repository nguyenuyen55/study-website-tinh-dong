import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateTimeTableComponent} from "./update-time-table/update-time-table.component";
import {CreateTimetableComponent} from "./create-timetable/create-timetable.component";

const routes: Routes = [{
  path:'updateTimeTable',component:UpdateTimeTableComponent
},{
  path:'createTimeTable',component:CreateTimetableComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerTimeTableRoutingModule { }
