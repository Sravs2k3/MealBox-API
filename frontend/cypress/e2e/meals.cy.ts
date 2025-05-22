describe('Meals Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/meals', { fixture: 'meals.json' }).as('getMeals');
    cy.visit('/meals');
  });

  it('loads and displays meals', () => {
    cy.wait('@getMeals');
    cy.get('.meal-card').should('have.length', 2);
    cy.get('.meal-card').first().contains('Meal One');
  });

  it('requires login to add to cart', () => {
    cy.wait('@getMeals');
    cy.get('.meal-card').first().find('button').contains('Add to Cart').click();
    cy.contains('Please login to add items to cart.');
  });

  it('requires login to add to wishlist', () => {
    cy.wait('@getMeals');
    cy.get('.meal-card').first().find('button').contains('Add to Wishlist').click();
    cy.contains('Please login to add items to wishlist.');
  });

  it('shows default image on image error', () => {
    cy.wait('@getMeals');
    cy.get('.meal-card').first().find('img').invoke('attr', 'src', 'invalid-url.jpg').trigger('error');
    cy.get('.meal-card').first().find('img').should('have.attr', 'src').and('include', 'default-meal.jpg');
  });
});
