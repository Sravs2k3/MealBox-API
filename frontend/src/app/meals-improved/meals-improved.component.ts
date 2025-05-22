import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Meal } from '../../models/meal.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-meals-improved',
  templateUrl: './meals-improved.component.html',
  styleUrls: ['./meals-improved.component.css']
})
export class MealsImprovedComponent implements OnInit {
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  searchQuery: string = '';
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private mealService: MealService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadMeals();
    this.loadCategories();
  }

  loadMeals(): void {
    this.loading = true;
    this.mealService.getMeals().subscribe({
      next: (meals) => {
        this.meals = meals;
        this.filteredMeals = meals;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load meals. Please try again later.';
        this.loading = false;
        console.error('Error loading meals:', error);
      }
    });
  }

  loadCategories(): void {
    this.mealService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  filterMeals(): void {
    this.filteredMeals = this.meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          meal.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || meal.categoryId === this.selectedCategory.id;
      return matchesSearch && matchesCategory;
    });
  }

  filterByCategory(category: Category): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.filterMeals();
  }

  addToCart(meal: Meal): void {
    this.cartService.addToCart(meal);
  }

  addToWishlist(meal: Meal): void {
    this.wishlistService.addToWishlist(meal);
  }

  getNutritionalInfo(meal: Meal): any {
    return {
      calories: meal.calories || 0,
      protein: meal.protein || 0,
      carbs: meal.carbs || 0,
      fats: meal.fats || 0
    };
  }
}
