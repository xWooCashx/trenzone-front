import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExercisesListComponent} from './exercises-list/exercises-list.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {TrainingsListComponent} from './pages/trainings-list/trainings-list.component';
import {TrainingComponent} from './pages/training/training.component';
import {UserBoardComponent} from './pages/user-board/user-board.component';
import {RegisterFormComponent} from './pages/register-form/register-form.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';

const routes: Routes = [
  {path: 'exercise', component: ExercisesListComponent},
  {path: 'home', component: UserBoardComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'signup', component: RegisterFormComponent},
  {path: 'training/:id', component: TrainingComponent},
  {path: 'trainings', component: TrainingsListComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
