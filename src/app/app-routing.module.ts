import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExercisesListComponent} from './exercises-list/exercises-list.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {TrainingsListComponent} from './pages/trainings-list/trainings-list.component';

const routes: Routes = [
  {path: 'exercise', component: ExercisesListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'trainings', component: TrainingsListComponent},
  {path: 'trainings/:id', component: TrainingsListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
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
