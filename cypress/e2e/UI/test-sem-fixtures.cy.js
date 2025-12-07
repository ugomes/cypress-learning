describe('Teste Usando Dados Hardcore', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('[data-test=login-button]').click();
    });

    it('Teste de login com Sucesso', () => {
        cy.url().should('include', '/inventory.html');
    });
    
});