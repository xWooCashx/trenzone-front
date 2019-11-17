import {Component, OnInit} from '@angular/core';
import {User} from '../../class/user';
import {SignUpInfo} from '../../auth/class/sign-up-info';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MyErrorStateMatcher} from '../register-form/register-form.component';

import { AuthService as NgAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userDetails = new User();
  showErrorMessage = false;
  loading = false;
  user: SocialUser;
  loggedIn: boolean;

  constructor(public ngAuthService: NgAuthService, private authService: AuthService,
              public router: Router, public tokenStorage: TokenStorageService) {
    this.userDetails.password = '';
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/user').then(r => {
      });
    }
    this.ngAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.userDetails.username, this.userDetails.password)
      .subscribe(data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.loading = false;
          this.router.navigateByUrl('/user').then(r => {
          });
        },
        error => {
          this.showErrorMessage = true;
          this.loading = false;
        });
  }
  signInWithFB(): void {
    this.ngAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.ngAuthService.signOut();
  }
}
