describe('Usando Fixtures', () => {
    // beforeEach(() => {
    //     cy.fixture('dados_login').then((user) => {
    //         cy.visit('/');
    //         cy.get('[data-test=username]').type(user.userName);
    //         cy.get('[data-test=password]').type(user.password);
    //         cy.get('[data-test=login-button]').click();
    //     });
    // });

    it('Teste de login com Sucesso usando fixtures', () => {
        cy.visit('/');
        cy.login();
        cy.url().should('include', '/inventory.html');
    });

    it('Cadastro Usuário', () => {
        cy.fixture('dados_cadastro').then((cadastro) => {
            cy.visit('https://www.automationpratice.com.br/register');
            cy.get('#user').type(cadastro.nome);
            cy.get('#email').type(cadastro.email);
            cy.get('#password').type(cadastro.senha);
            cy.get('#btnRegister').click();
            // Boa prática de teste: Validar a mensagem de sucesso do cadastro
            cy.get('#swal2-title').should('have.text', 'Cadastro realizado!');
            cy.get('#swal2-html-container').should('contain', 'Bem-vindo ');
        });
          
        
        
    });
});