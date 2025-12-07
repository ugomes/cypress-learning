import { faker } from '@faker-js/faker/locale/pt_BR';


describe('Utilizando Faker ', () => {
       const nome = faker.person.firstName();
       const email = faker.internet.email();
       const senha = faker.internet.password(10);

    beforeEach(() => {
        cy.visit('https://www.automationpratice.com.br/register');
    });
    it('Preenchendo formulário com dados falsos', () => {
       

        // Exemplo de uso do Faker para gerar dados falsos
       cy.get('#user').type(nome);
       cy.get('#email').type(email);
       cy.get('#password').type(senha);
       cy.get('#btnRegister').click()

       cy.get('#swal2-title').should('have.text', 'Cadastro realizado!');
       cy.get('#swal2-html-container').should('contain', 'Bem-vindo ')
    });
      
    
});