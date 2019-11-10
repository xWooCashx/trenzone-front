import {Component, OnInit} from '@angular/core';
import {User} from '../../class/user';
import {SignUpInfo} from '../../auth/class/sign-up-info';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MyErrorStateMatcher} from '../register-form/register-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userDetails = new User();
  showErrorMessage = false;
  loading = false;

  constructor(private authService: AuthService, public router: Router, public tokenStorage: TokenStorageService) {
    this.userDetails.password = '';
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/user').then(r => {
      });
    }
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
}
