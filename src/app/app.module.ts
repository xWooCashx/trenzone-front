import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TrainingListComponent} from './training-list/training-list.component';
import {TrainingFormComponent} from './training-form/training-form.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingService} from './service/training.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {TrainingCardComponent} from './training-card/training-card.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TrainingCreatorComponent} from './training-creator/training-creator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatTableModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { UserComponent } from './auth/components/user/user.component';
import { PmComponent } from './auth/components/pm/pm.component';
import { AdminComponent } from './auth/components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingListComponent,
    TrainingFormComponent,
    NavBarComponent,
    TrainingCardComponent,
    TrainingCreatorComponent,
    ExercisesListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    PmComponent,
    AdminComponent,
  ],
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
    MatTableModule

  ],
  providers: [TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
