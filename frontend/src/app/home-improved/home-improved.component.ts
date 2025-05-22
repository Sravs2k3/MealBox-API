import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-improved',
  templateUrl: './home-improved.component.html',
  styleUrls: ['./home-improved.component.css']
})
export class HomeImprovedComponent implements OnInit {
  specialMeals: Meal[] = [];
  categories: { id: number; name: string; imageUrl?: string }[] = [];
  categoryFlashCards: { name: string; displayName: string; imageUrl: string }[] = [];

  private categoryImages: { [key: string]: string } = {
    'Vegetarian': 'assets/images/categories/vegetarian.jpg',
    'Non-Vegetarian': 'assets/images/categories/non-vegetarian.jpg',
    'Vegan': 'assets/images/categories/vegan.jpg',
    'Desserts': 'assets/images/categories/desserts.jpg',
    // Add more category name to image mappings as needed
  };

  private allowedMealNames = new Set([
    'Spaghetti Bolognese',
    'Margherita Pizza',
    'Caesar Salad'
  ]);

  constructor(
    private mealService: MealService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSpecialMeals();
    this.loadCategories();
    this.loadCategoryFlashCards();
  }

  loadSpecialMeals(): void {
    this.mealService.getMeals().subscribe(meals => {
      this.specialMeals = (meals as Meal[]).filter(meal => this.allowedMealNames.has(meal.name));
    });
  }

  loadCategories(): void {
    this.mealService.getMeals().subscribe(meals => {
      const categoryMap = new Map<string, { id: number; name: string; imageUrl?: string }>();
      meals.forEach(meal => {
        if (meal.category) {
          if (!categoryMap.has(meal.category)) {
            const imageUrl = this.categoryImages[meal.category] || 'assets/images/categories/default.jpg';
            categoryMap.set(meal.category, { id: 0, name: meal.category, imageUrl });
          }
        }
      });
      this.categories = Array.from(categoryMap.values());
    });
  }

  loadCategoryFlashCards(): void {
    this.mealService.getMeals().subscribe(meals => {
      const uniqueCategories = new Map<string, { name: string; displayName: string; imageUrl: string }>();
      meals.forEach(meal => {
        if (meal.category && !uniqueCategories.has(meal.category)) {
          uniqueCategories.set(meal.category, {
            name: meal.category,
            displayName: meal.category,
            imageUrl: this.categoryImages[meal.category] || 'assets/images/categories/default.jpg'
          });
        }
      });
      this.categoryFlashCards = Array.from(uniqueCategories.values());
    });
  }

  filterByCategory(categoryName: string): void {
    // Implement filtering logic or navigation to meals page filtered by category
    console.log('Filter meals by category:', categoryName);
  }

  addToCart(meal: Meal): void {
    const token = this.authService.getToken();
    if (!token) {
      alert('Please login to add items to cart.');
      this.router.navigate(['/login']);
      return;
    }
    const cartItem = { mealId: meal.id, quantity: 1 };
    this.cartService.addToCart(cartItem, token).subscribe({
      next: () => {
        alert(`${meal.name} added to cart.`);
      },
      error: () => {
        alert('Failed to add item to cart.');
      }
    });
  }
}
