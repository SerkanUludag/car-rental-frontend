import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean;
  dataLoaded = false;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.checkIsAuthenticated();
    if (this.isAuthenticated) {
      this.getLoggedUser();
    } else {
      this.dataLoaded = true;
    }
  }

  checkIsAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getLoggedUser() {
    let email = this.localStorageService.getItem('userEmail');
    if (email) {
      this.authService.getUser(email).subscribe((response) => {
        this.loggedUser = response;
        this.dataLoaded = true;
      });
    }
  }

  logout() {
    this.localStorageService.clear();
    setTimeout(() => location.reload(), 200);
  }
}
