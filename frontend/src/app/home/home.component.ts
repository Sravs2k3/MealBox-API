import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface CategoryFlashCard {
  name: string;
  displayName: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMeals: Meal[] = [];
  specialMeals: Meal[] = [];
  token: string | null = null;

  categoryFlashCards: CategoryFlashCard[] = [
    { name: 'Veg', displayName: 'Veg', imageUrl: 'assets/images/veg-category.jpg' },
    { name: 'Non-Veg', displayName: 'Non-Veg', imageUrl: 'assets/images/non-veg-category.jpg' },
    { name: 'Dessert', displayName: 'Desserts', imageUrl: 'assets/images/desserts-category.jpg' },
    { name: 'Snack', displayName: 'Snacks', imageUrl: 'assets/images/snacks-category.jpg' },
    { name: 'Breakfast', displayName: 'Breakfast', imageUrl: 'assets/images/breakfast-category.jpg' },
    { name: 'Special', displayName: 'Special', imageUrl: 'assets/images/special-category.jpg' }
  ];

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
    this.token = this.authService.getToken();
    this.loadPopularMeals();
    this.loadSpecialMeals();
  }

  loadPopularMeals(): void {
    this.mealService.getMeals().subscribe({
      next: (meals) => {
        // Filter meals to only allowed names
        this.popularMeals = meals.filter(meal => this.allowedMealNames.has(meal.name)) as Meal[];
      },
      error: (error) => {
        console.error('Failed to load meals', error);
      }
    });
  }

  loadSpecialMeals(): void {
    this.mealService.getMeals().subscribe({
      next: (meals) => {
        this.specialMeals = (meals as Meal[]).filter(meal => meal.isSpecial);
      },
      error: (error) => {
        console.error('Failed to load special meals', error);
      }
    });
  }

  addToCart(meal: Meal): void {
    if (!this.token) {
      alert('Please login to add items to cart.');
      this.router.navigate(['/login']);
      return;
    }
    const cartItem = { mealId: meal.id, quantity: 1 };
    this.cartService.addToCart(cartItem, this.token).subscribe({
      next: () => {
        alert(`${meal.name} added to cart.`);
      },
      error: () => {
        alert('Failed to add item to cart.');
      }
    });
  }

  navigateToMeals(categoryName: string): void {
    this.router.navigate(['/meals'], { queryParams: { category: categoryName } });
  }
}
