import { QuestionComponent } from './views/question/question.component';
import { HomeComponent } from './views/homepage/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LessionComponent } from './views/lession/lession.component';
import {PagenotfoundComponent} from "./views/pagelogin/pagenotfound/pagenotfound.component";
import {UserGuard} from "./core/guards/user.guard";
import { ScheduleComponent } from './views/schedule/schedule.component';
import { TeacherComponent } from './views/teacher/teacher.component';
import { StudentComponent } from './views/student/student.component';
import {TimetableteacherComponent} from "./views/timetableteacher/timetableteacher.component";
import {TeacherGuard} from "./core/guards/teacher.guard";
import {NewsComponent} from "./views/news/news.component";
import { DetailLessionComponent } from './views/detail-lession/detail-lession.component';
import {ListTeacherComponent} from "./views/manager-teacher/list-teacher/list-teacher.component";
import {ListClassComponent} from "./views/manager-class/list-class/list-class.component";
import {ChangePasswordComponent} from "./views/change-password/change-password.component";
import {ListStudentTeacherComponent} from "./views/list-student-teacher/list-student-teacher.component";


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lession',  children: [
    {
      path: '',
      component: LessionComponent ,
    },
    {
      path: ':id',  // child route pa
      component: DetailLessionComponent,  // child route component that the router renders
    },
  ]},
  { path: 'schedule', component: ScheduleComponent },
  { path: 'news', component: NewsComponent },
  { path: 'search/teacher', component: TeacherComponent },
  { path: 'search/student', component: StudentComponent },
  { path: 'q&a', component: QuestionComponent },
  { path: 'teachers', component: ListTeacherComponent },
  { path: 'tabletime', component: TimetableteacherComponent,canActivate:[TeacherGuard] },
  { path: 'classes', component: ListClassComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'list-student-teacher', component: ListStudentTeacherComponent },
  // {path: "**", component: PagenotfoundComponent}
  { path: '**', pathMatch: 'full',
  component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
