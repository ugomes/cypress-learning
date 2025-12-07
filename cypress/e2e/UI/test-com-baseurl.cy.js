describe('Testando com Base URL de uma Página', () => {
    beforeEach(() => {

        cy.visit('/'); // Boas práticas: usar baseUrl configurado no cypress.config.js
        
    });
    it('Verificar o título da página', () => {
        cy.title().should('eq', 'Swag Labs');
    });
    
    it('Verificar se o botão de login está presente', () => {
        cy.get('[data-test=login-button]').should('be.visible');
    });
    
});