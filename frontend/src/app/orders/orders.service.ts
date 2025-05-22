import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  id: number;
  orderId: number;
  mealId: number;
  quantity: number;
  meal?: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  orderDate: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://localhost:5001/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${userId}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/details/${orderId}`);
  }
}
