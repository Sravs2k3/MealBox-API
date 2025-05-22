import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css']
})
export class MealCardComponent {
  @Input() meal!: Meal;
  @Output() addToCart = new EventEmitter<Meal>();
  @Output() addToWishlist = new EventEmitter<Meal>();

  onAddToCart() {
    this.addToCart.emit(this.meal);
  }

  onAddToWishlist() {
    this.addToWishlist.emit(this.meal);
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default-meal.jpg';
  }
}
