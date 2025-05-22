import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meal {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  type: 'Veg' | 'Non-Veg';
  imageUrl: string;
  description?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:5000/api/meals'; // Adjust the URL as per backend

  constructor(private http: HttpClient) {}

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }
}
