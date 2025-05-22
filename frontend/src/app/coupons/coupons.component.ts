import { Component, OnInit } from '@angular/core';
import { CouponService, Coupon } from '../services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  errorMessage: string | null = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponService.getCoupons().subscribe({
      next: (data) => {
        this.coupons = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load coupons. Please try again later.';
      }
    });
  }
}
