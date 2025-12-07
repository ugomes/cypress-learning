
describe('Fluxo Carrinho Com Commands', () => {
    beforeEach(() => {

        cy.visit('/');
        cy.login();
        
    });

    it('Deve Comprar a Mochila com Sucesso', () => {
        cy.fluxo_carrinho_sucesso();

        cy.get('[data-test="complete-header"]').should('be.visible');
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!!');
       


    });

    it('Deve Remover produto do carrinho', () => {
        cy.remover_produto_carrinho();
        
    });

    it('Usado o fixtures com Dados no Cy.Commands', () => {
        //cy.usando_fixture('dados_login');

        cy.url().should('include', '/inventory.html');
    });



});