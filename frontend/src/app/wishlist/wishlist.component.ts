import { Component, OnInit } from '@angular/core';
import { WishlistService, WishlistItem } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  loading = false;
  errorMessage: string | null = null;
  userId: number | null = null;
  token: string | null = null;

  constructor(private wishlistService: WishlistService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.token = this.authService.getToken();
        this.loadWishlistItems();
      } else {
        this.wishlistItems = [];
        this.token = null;
      }
    });
  }

  loadWishlistItems(): void {
    if (!this.token) return;
    this.loading = true;
    this.wishlistService.getWishlistItems(this.token).subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load wishlist items.';
        this.loading = false;
      }
    });
  }

  removeItem(item: WishlistItem): void {
    if (!this.token) return;
    this.wishlistService.removeFromWishlist(item.id, this.token).subscribe({
      next: () => this.loadWishlistItems(),
      error: () => this.errorMessage = 'Failed to remove item from wishlist.'
    });
  }
}
