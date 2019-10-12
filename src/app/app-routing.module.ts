import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingListComponent} from './training-list/training-list.component';
import {TrainingFormComponent} from './training-form/training-form.component';
import {TrainingCreatorComponent} from './training-creator/training-creator.component';
import {ExercisesListComponent} from './exercises-list/exercises-list.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {NewTrainingComponent} from './pages/new-training/new-training.component';

const routes: Routes = [
  {path: 'training', component: TrainingListComponent},
  {path: 'addtraining', component: TrainingFormComponent},
  {path: 'newaddtraining', component: TrainingCreatorComponent},
  {path: 'exercise', component: ExercisesListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'new-training', component: NewTrainingComponent},
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
