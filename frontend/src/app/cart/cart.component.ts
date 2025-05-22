import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  errorMessage: string | null = null;
  token: string | null = null;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.token = this.authService.getToken();
        this.loadCartItems();
      } else {
        this.cartItems = [];
        this.token = null;
      }
    });
  }

  loadCartItems(): void {
    if (!this.token) return;
    this.loading = true;
    this.cartService.getCartItems(this.token).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load cart items.';
        this.loading = false;
      }
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (!this.token) return;
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }
    const updatedItem = { ...item, quantity };
    this.cartService.updateCartItem(item.id, updatedItem, this.token).subscribe({
      next: () => this.loadCartItems(),
      error: () => this.errorMessage = 'Failed to update item quantity.'
    });
  }

  removeItem(item: CartItem): void {
    if (!this.token) return;
    this.cartService.removeFromCart(item.id, this.token).subscribe({
      next: () => this.loadCartItems(),
      error: () => this.errorMessage = 'Failed to remove item from cart.'
    });
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.meal?.price || 0) * item.quantity, 0);
  }

  showOrderSuccess = false;

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    // For now, simulate order placement
    this.showOrderSuccess = true;
    setTimeout(() => {
      this.showOrderSuccess = false;
    }, 4000);
    // Clear cart after order placement
    this.cartItems = [];
  }
}
