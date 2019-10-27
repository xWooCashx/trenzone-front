import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../../class/auth-login-info';
import {AuthService} from '../../auth.service';
import {TokenStorageService} from '../../token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStroage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStroage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStroage.getAuthorities();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStroage.saveToken(data.token);
        this.tokenStroage.saveUsername(data.username);
        this.tokenStroage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStroage.getAuthorities();
        this.router.navigateByUrl('/user').then(value => {
        });
        // this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
