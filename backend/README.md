# MealBox Backend

This is the backend API for the MealBox Indian Food Delivery App.

## Tech Stack

- ASP.NET Core Web API
- Entity Framework Core with SQLite
- JWT Authentication

## Setup Instructions

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Restore dependencies and build the project:
   ```
   dotnet restore
   dotnet build
   ```

3. Apply database migrations:
   ```
   dotnet ef database update
   ```

4. Run the API:
   ```
   dotnet run
   ```

The API will be available at `https://localhost:5001` or `http://localhost:5000`.

## Features

- User authentication with JWT
- CRUD operations for Meals, Categories, Cart, Wishlist, Orders, Coupons
- Secure endpoints with role-based authorization
