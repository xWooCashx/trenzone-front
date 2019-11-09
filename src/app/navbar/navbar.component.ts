import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  clickedLink = 'user';

  constructor(public tokenStorage: TokenStorageService, public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onToggleSidenav() {
  }
}
