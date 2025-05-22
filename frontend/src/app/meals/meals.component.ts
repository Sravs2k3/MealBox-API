import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';
import { IndianFoodItem, INDIAN_FOOD_ITEMS } from '../data/indian-food-items';

interface CategoryFlashCard {
  name: string;
  displayName: string;
  imageUrl: string;
}

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  meals: IndianFoodItem[] = [];
  filteredMeals: IndianFoodItem[] = [];
  errorMessage: string | null = null;
  loading = false;
  userId: number | null = null;
  isLoggedIn = false;
  token: string | null = null;

  categoryFlashCards: CategoryFlashCard[] = [];

  private categoryImages: { [key: string]: string } = {
    'Veg': 'assets/images/veg-category.jpg',
    'Non-Veg': 'assets/images/non-veg-category.jpg',
    'Breakfast': 'assets/images/breakfast-category.jpg',
    'Snack': 'assets/images/snacks-category.jpg',
    'Dessert': 'assets/images/desserts-category.jpg',
    'Special': 'assets/images/special-category.jpg'
  };

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.authService.currentUser$.subscribe(user => {
      this.userId = user ? user.id : null;
      this.isLoggedIn = !!user;
    });

    this.loadMeals();

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.filterMealsByCategory(category);
      } else {
        this.filteredMeals = this.meals;
      }
    });
  }

  loadMeals(): void {
    this.loading = true;
    this.meals = INDIAN_FOOD_ITEMS;
    this.filteredMeals = INDIAN_FOOD_ITEMS;
    this.generateCategoryFlashCards(INDIAN_FOOD_ITEMS);
    this.loading = false;
    this.cdr.detectChanges();
  }

  private generateCategoryFlashCards(meals: IndianFoodItem[]): void {
    const uniqueCategories = new Map<string, CategoryFlashCard>();
    meals.forEach(meal => {
      if (meal.category) {
        const categories = meal.category.split(',').map(c => c.trim());
        categories.forEach(cat => {
          const normalizedCat = this.normalizeCategoryName(cat);
          if (!uniqueCategories.has(normalizedCat)) {
            uniqueCategories.set(normalizedCat, {
              name: normalizedCat,
              displayName: normalizedCat,
              imageUrl: this.categoryImages[normalizedCat] || 'assets/images/categories/default.jpg'
            });
          }
        });
      }
    });
    this.categoryFlashCards = Array.from(uniqueCategories.values());

    // Sort flashcards in the requested order
    const order = ['Veg', 'Non-Veg', 'Breakfast', 'Dessert', 'Snack', 'Special'];
    this.categoryFlashCards.sort((a, b) => {
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    console.log('Generated categoryFlashCards:', this.categoryFlashCards);
    this.cdr.detectChanges();
  }

  private normalizeCategoryName(category: string): string {
    const mapping: { [key: string]: string } = {
      'veg': 'Veg',
      'non-veg': 'Non-Veg',
      'breakfast': 'Breakfast',
      'snack': 'Snack',
      'snacks': 'Snack',
      'dessert': 'Dessert',
      'special': 'Special'
    };
    const lower = category.toLowerCase();
    return mapping[lower] || category;
  }

  filterMealsByCategory(category: string): void {
    if (!category) {
      this.filteredMeals = this.meals;
      return;
    }
    const cat = category.toLowerCase();
    this.filteredMeals = this.meals.filter(meal => {
      if (!meal.category) return false;
      const categories = meal.category.toLowerCase().split(',').map(c => c.trim());
      if (cat === 'dessert') {
        return categories.includes('dessert');
      }
      if (cat === 'snack') {
        return categories.includes('snack') || categories.includes('starter');
      }
      return categories.includes(cat);
    });
  }

  addToCart(meal: IndianFoodItem): void {
    if (!this.isLoggedIn) {
      alert('Please login to add items to cart.');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.token) {
      alert('Authentication token not found.');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart({ mealId: meal.id, quantity: 1 }, this.token).subscribe({
      next: () => {
        alert(`${meal.name} added to cart.`);
      },
      error: () => {
        alert('Failed to add item to cart.');
      }
    });
  }

  addToWishlist(meal: IndianFoodItem): void {
    if (!this.isLoggedIn) {
      alert('Please login to add items to wishlist.');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.token) {
      alert('Authentication token not found.');
      this.router.navigate(['/login']);
      return;
    }
    this.wishlistService.addToWishlist({ mealId: meal.id }, this.token).subscribe({
      next: () => {
        alert(`${meal.name} added to wishlist.`);
      },
      error: (error) => {
        console.error('Add to wishlist error:', error);
        if (error.error && error.error.message) {
          alert(`Failed to add item to wishlist: ${error.error.message}`);
        } else {
          alert('Failed to add item to wishlist.');
        }
      }
    });
  }

  onImageError(event: Event): void {
    try {
      const element = event.target as HTMLImageElement;
      element.src = 'assets/default-meal.jpg';
    } catch (error) {
      console.error('Error handling image load error:', error);
    }
  }
}
