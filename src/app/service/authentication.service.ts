import {Injectable} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username: string;
  public role: string;

  constructor(private tokenStorage: TokenStorageService) {
  }

  public isLogged(): boolean {
    return !!this.tokenStorage.getToken();
  }

  public getUsername(): string {
    return this.tokenStorage.getUsername();
  }

  public getRoles(): string[] {
    return this.tokenStorage.getAuthorities();
  }
}
