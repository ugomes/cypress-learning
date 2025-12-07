describe('Fluxo Carrinho', () => {
    beforeEach(() => {

        // Boas práticas: usar baseUrl configurado no cypress.config.js
        cy.fixture('dados_login').then((users) => {
            cy.visit('/');
            cy.get('#user-name').type(users.userName);
            cy.get('#password').type(users.password);
            cy.get('#login-button').click();
        });
    });
    it('Deve Comprar a Mochila com Sucesso', () => {
        cy.url().should('include', '/inventory.html');

        cy.get('#item_4_title_link').click();     

        cy.get('#add-to-cart').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="inventory-item-price"]').should('have.text', '$29.99');
        cy.get('[data-test=checkout]').click();
        cy.get('[data-test=firstName]').type('João');
        cy.get('[data-test=lastName]').type('Silva');
        cy.get('[data-test=postalCode]').type('12345');
        cy.get('#continue').click();
        cy.get('[name="finish"]').click();

        cy.get('[data-test="complete-header"]').should('be.visible');
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    });
    
    it('Deve Remover produto do carrinho', () => {
        cy.url().should('include', '/inventory.html');
        cy.get('#item_4_title_link').click();
        cy.get('#add-to-cart').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('button').contains('Remove').click();

        cy.get('.cart_item').should('not.exist');

        
    });
    
});