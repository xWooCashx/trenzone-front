import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../../class/auth-login-info';
import {AuthService} from '../../auth.service';
import {TokenStorageService} from '../../token-storage.service';

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

  constructor(private authService: AuthService, private tokenStroage: TokenStorageService) {
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
        this.tokenStroage.saveToken(data.accessToken);
        this.tokenStroage.saveUsername(data.username);
        this.tokenStroage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStroage.getAuthorities();
        this.reloadPage();
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
