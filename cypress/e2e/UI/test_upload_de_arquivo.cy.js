describe('Fazendo Upload de Arquivo', () => {
    it('Deve fazer upload de um arquivo com sucesso', () => {
        cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html');

        cy.wait(2000);

        cy.get('input[type="file"]').selectFile('cypress/fixtures/arquivo_teste.pdf');

        cy.get('input[type="file"]').selectFile('cypress/fixtures/arquivo_teste.pdf', { action: 'drag-drop' });

       
        
    }); 


    
});