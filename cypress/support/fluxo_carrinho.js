Cypress.Commands.add('fluxo_carrinho_sucesso', () => {
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

    

});

Cypress.Commands.add('remover_produto_carrinho', () => {
    cy.url().should('include', '/inventory.html');
    cy.get('#item_4_title_link').click();
    cy.get('#add-to-cart').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('button').contains('Remove').click();

    cy.get('.cart_item').should('not.exist');
});