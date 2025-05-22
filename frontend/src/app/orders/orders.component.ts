import { Component, OnInit } from '@angular/core';
import { OrdersService, Order } from '../orders/orders.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  errorMessage: string | null = null;
  userId: number | null = null;

  constructor(private ordersService: OrdersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.loadOrders();
      } else {
        this.orders = [];
      }
    });
  }

  loadOrders(): void {
    if (!this.userId) return;
    this.loading = true;
    this.ordersService.getOrders(this.userId).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.loading = false;
      }
    });
  }
}
