import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      console.log('currentUser$ emitted user:', user);
      this.isLoggedIn = !!user;
      console.log('isLoggedIn set to:', this.isLoggedIn);
    });
    // Also check token on init to handle page refresh
    if (this.authService.getToken()) {
      this.authService.loadUserProfile().subscribe(user => {
        console.log('loadUserProfile returned user:', user);
        if (user) {
          this.authService.setCurrentUser(user);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    alert('Logout successful');
    this.router.navigate(['/login']);
  }
}
