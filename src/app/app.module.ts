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
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatGridListModule,
  MatChipsModule,
  MatPaginatorModule,
  MatToolbarModule, MatMenuModule, MatDatepickerModule, MatRadioModule, MatButtonToggleModule, MAT_DIALOG_DEFAULT_OPTIONS, MatTooltipModule
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
import {TrainingComponent} from './pages/training/training.component';
import {TrainingDetailsComponent} from './pages/training/training-details/training-details.component';
import {ActivityDetailsDialogComponent} from './pages/training/activity-info/activity-details-dialog/activity-details-dialog.component';
import {ActivitiesSetComponent} from './pages/training/activities-set/activities-set.component';
import {httpInterceptorProviders} from './auth/auth-interceptor.service';
import {TrainingsListComponent} from './pages/trainings-list/trainings-list.component';
import {TrainingSearchItemComponent} from './pages/trainings-list/training-search-item/training-search-item.component';
import {TrainingsSearchPanelComponent} from './pages/trainings-list/trainings-search-panel/trainings-search-panel.component';
import {UserBoardComponent} from './pages/user-board/user-board.component';
import {TrainingCommentsComponent} from './pages/training/training-comments/training-comments.component';
import {UserDetailsComponent} from './pages/user-board/user-details/user-details.component';
import {UserTrainingsComponent} from './pages/user-board/user-trainings/user-trainings.component';
import {UserAchievementsComponent} from './pages/user-board/user-achievements/user-achievements.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RatingModule} from 'ng-starrating';
import {UserModule} from './auth/user/user.module';
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {RegisterFormComponent} from './pages/register-form/register-form.component';
import {SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {ToastrModule} from 'ngx-toastr';
import {TrainerDetailsComponent} from './pages/trainings-list/trainer-details/trainer-details.component';
import {DeleteTrainingModalComponent} from './pages/training/delete-training-modal/delete-training-modal.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('611144869422669')
  }
]);

export function provideConfig() {
  return config;
}

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
    UserBoardComponent,
    TrainingCommentsComponent,
    UserDetailsComponent,
    UserTrainingsComponent,
    UserAchievementsComponent,
    NavbarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TrainerDetailsComponent,
    DeleteTrainingModalComponent
  ],
  entryComponents: [ActivityDetailsDialogComponent,
    TrainerDetailsComponent,
    DeleteTrainingModalComponent],
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
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    RatingModule,
    UserModule,
    MatDatepickerModule,
    SocialLoginModule,
    MatRadioModule,
    MatButtonToggleModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
  ],
  providers: [
    httpInterceptorProviders, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
