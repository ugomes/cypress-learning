
describe('Preencher Formulário com Sucesso', () => {

    it('Preenche o formulário usando forEach', () => {
        cy.visit('https://gleyslla.github.io/teste-de-formulario-de-contato/');
        cy.fixture('dados_formulario').then((dados) => {
           
            dados.forEach((dado) => {
                               
                cy.get('#name').type(dado.nome);
                cy.get('#email').type(dado.email);
                cy.get('#phone').type(dado.telefone);
                cy.get('#message').type(dado.mensagem);
                cy.get('#subject').select(dado.assunto);
                cy.get('button[type="submit"]').click();
                cy.get('h3').should('have.text', 'Mensagem enviada com sucesso!');
                
                // Aguarda a mensagem de sucesso antes de continuar
                cy.wait(1000);
                cy.contains('Enviar Nova Mensagem').should('have.text', 'Enviar Nova Mensagem').click()
            })
        })
    });

    it('Preenche o formulário usando Commands', () => {
        cy.preencherFormulario();
    });
});