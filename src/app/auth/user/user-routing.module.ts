import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserBoardComponent} from '../../pages/user-board/user-board.component';
import {TrainingComponent} from '../../pages/training/training.component';
import {UserAuthGuard} from '../user-auth.guard';

const routes: Routes = [
  {
    path: 'training-creator',
    canActivate: [UserAuthGuard],
    component: TrainingComponent
  },
  {
    path: 'user',
    canActivate: [UserAuthGuard],
    component: UserBoardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
