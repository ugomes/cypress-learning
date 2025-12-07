describe('Teste Sem Base URL', () => {

    beforeEach(() => {
        cy.visit('https://www.automationpratice.com.br/'); // Não usa baseURL não é uma boa prática
    });
    it.only('Teste de uma página', () => {
        cy.title().should('eq', 'QAZANDO Shop E-Commerce');
        cy.wait(2000);
        cy.viewport(1280, 720);
        cy.screenshot('home_page');

    });

  

    
    
});