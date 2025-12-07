Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn').should('have.text', 'Open Menu').click();
    cy.get('[data-test="logout-sidebar-link"]').should('have.text', 'Logout').click()
});