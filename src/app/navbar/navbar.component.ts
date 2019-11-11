import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthenticationService} from '../service/authentication.service';
import {NavigationStart, Router} from '@angular/router';
import {UserService} from '../auth/sevice/user.service';
import {UserServiceService} from '../service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showingTraining = false;
  trainingURLs = new Set();

  constructor(public tokenStorage: TokenStorageService, public authenticationService: AuthenticationService,
              public router: Router) {
    router.events
      .subscribe((event: NavigationStart) => {
          if (event instanceof NavigationStart) {
            if (event.url.includes('training/')) {
              this.showingTraining = true;
              if (!this.trainingURLs.has(event.url.slice(event.url.lastIndexOf('/') + 1))) {
                console.log('includes');
                this.trainingURLs.add(event.url.slice(event.url.lastIndexOf('/') + 1));
              }
            } else {
              this.showingTraining = false;
            }
          }
        }
      );
  }


  ngOnInit() {
  }

  onToggleSidenav() {
  }
}
