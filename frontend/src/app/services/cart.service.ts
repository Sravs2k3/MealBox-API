import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  userId: number;
  mealId: number;
  quantity: number;
  meal?: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  getCartItems(token: string): Observable<CartItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartItem[]>(this.apiUrl, { headers });
  }

  addToCart(cartItem: Partial<CartItem>, token: string): Observable<CartItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CartItem>(this.apiUrl, cartItem, { headers });
  }

  updateCartItem(id: number, cartItem: Partial<CartItem>, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.apiUrl}/${id}`, cartItem, { headers });
  }

  removeFromCart(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
