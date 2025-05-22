import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (userData) => {
        this.user = userData;
        this.loading = false;
      },
      error: () => {
        this.user = null;
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }
}
