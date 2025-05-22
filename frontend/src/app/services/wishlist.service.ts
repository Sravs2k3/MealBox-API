import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WishlistItem {
  id: number;
  userId: number;
  mealId: number;
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
export class WishlistService {
  private apiUrl = 'http://localhost:5000/api/wishlist';

  constructor(private http: HttpClient) {}

  getWishlistItems(token: string): Observable<WishlistItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<WishlistItem[]>(this.apiUrl, { headers });
  }

  addToWishlist(wishlistItem: Partial<WishlistItem>, token: string): Observable<WishlistItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<WishlistItem>(this.apiUrl, wishlistItem, { headers });
  }

  removeFromWishlist(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
