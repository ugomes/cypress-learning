Cypress.Commands.add('login', () => {
    cy.get('[data-test=username]').type('standard_user');
    cy.get('[data-test=password]').type('secret_sauce');
    cy.get('[data-test=login-button]').click();
});

Cypress.Commands.add('dados_em_branco', () => {
    cy.get('[data-test=login-button]').click();
});

Cypress.Commands.add('usando_fixture', (dados_login) => {
    cy.fixture(dados_login).then((user) => {
        cy.get('[data-test=username]').type(user.userName);
        cy.get('[data-test=password]').type(user.password);
        cy.get('[data-test=login-button]').click();
    });
});