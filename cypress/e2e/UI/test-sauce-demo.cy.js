describe('Site Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

    });
    it('Verificar o nome da Página Home', () => {
      cy.title().should('eq', 'Swag Labs')
                
    });

    it('Verificar o texto Accepted usernames are:', () => {
        cy.get('h4').should('contain','Accepted ')
    })

    it('Verificar mesangem de erro campos vazios',() => {
        cy.get('[data-test=login-button]').click()
        cy.get('[data-test=error]').should('be.visible')
            .and('have.text','Epic sadface: Username is required')
        
    })

    afterEach(() => {
        cy.clearCookies(); // Executa após cada teste, se necessário
    });

    it('',()=>{
        
    })
    
});