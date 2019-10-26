import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingService} from './service/training.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ExercisesListComponent} from './exercises-list/exercises-list.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {UserComponent} from './auth/components/user/user.component';
import {PmComponent} from './auth/components/pm/pm.component';
import {AdminComponent} from './auth/components/admin/admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ActivityInfoComponent} from './pages/training/activity-info/activity-info.component';
import { TrainingComponent } from './pages/training/training.component';
import { TrainingDetailsComponent } from './pages/training/training-details/training-details.component';
import { ActivityDetailsDialogComponent } from './pages/training/activity-info/activity-details-dialog/activity-details-dialog.component';
import { ActivitiesSetComponent } from './pages/training/activities-set/activities-set.component';
import {httpInterceptorProviders} from './auth/auth-interceptor.service';
import { TrainingsListComponent } from './pages/trainings-list/trainings-list.component';
import { TrainingSearchItemComponent } from './pages/trainings-list/training-search-item/training-search-item.component';
import { TrainingsSearchPanelComponent } from './pages/trainings-list/trainings-search-panel/trainings-search-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    PmComponent,
    AdminComponent,
    TrainingsListComponent,
    TrainingSearchItemComponent,
    TrainingsSearchPanelComponent,
    ActivityInfoComponent,
    TrainingComponent,
    TrainingDetailsComponent,
    ActivityDetailsDialogComponent,
    ActivitiesSetComponent,
  ],
  entryComponents: [ActivityDetailsDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatTableModule,
    DragDropModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
