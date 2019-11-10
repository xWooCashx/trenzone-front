import {Component, OnInit} from '@angular/core';
import {User} from '../../class/user';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {SignUpInfo} from '../../auth/class/sign-up-info';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  userDetails = new User();
  repeatedPass = '';
  passwordsError = false;
  err = new MyErrorStateMatcher();
  private signupInfo: SignUpInfo;
  showErrorMessage = false;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, public router: Router, public tokenStorage: TokenStorageService) {
    this.userDetails.password = this.repeatedPass;
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.signupInfo = new SignUpInfo(
      this.userDetails.username,
      this.userDetails.email,
      this.userDetails.password
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.authService.login(this.userDetails.username, this.userDetails.password).subscribe(value => {
          this.tokenStorage.saveToken(value.token);
          this.tokenStorage.saveUsername(value.username);
          this.tokenStorage.saveAuthorities(value.authorities);
          this.router.navigateByUrl('/user').then(r => {
          });
        });
        this.loading = false;
      },
      error => {
        this.showErrorMessage = true;
        console.log(error.error.message);
        if (error.error.message.includes('->')) {
          this.errorMessage = error.error.message.slice(error.error.message.toString().lastIndexOf('->') + 2);
        } else {
          this.errorMessage = error.error.message;
        }
        this.loading = false;
      }
    );
  }

  checkPass(event) {
    console.log(event);
    this.passwordsError = this.repeatedPass !== this.userDetails.password;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
