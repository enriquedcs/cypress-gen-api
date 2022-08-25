/// <reference types="Cypress"/>

import config from './config.json'
 
// Suite test cases Happy path
describe('Obtener detalles del contenido del documento contrato', function () {   

    it('API - Get details document by product', () => {
        //Enviamos la petición apuntando a la URL1 de Config.json ***De aca sacamos el file_id****
        cy.request({
            method: 'GET',
            url: `${config.URL}`,
            failOnStatusCode: false,
        }).as('details')
        //Validamos status de respuesta
        cy.get('@details').its('status').should('eq', 200)
        //Validamos las propiedades de la respueta
        cy.get('@details').should(({response}) => {
            expect(response && response.body).to.have.property('status', 'success')
            expect(response && response.body).to.have.property('data', [])
        })
    })

    it.only('API - Create PDF from Documento', () => {
        let res
        //Enviamos la petición apuntando a la URL2 de Config.json
        cy.request({
            method: 'GET',
            url: `${config.URL2}`,
            failOnStatusCode: false,
        }).as('createPDF')

        //Validamos status de respuesta
        cy.get('@createPDF').its('status').should('eq', 200)
        cy.get('@createPDF').then((response) => {
            res = response.body
            let att1 = res['count']
            cy.log(att1)
        })
        

        cy.get('@createPDF').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
        
        
    })

    it('API - Get PDF URL', () => {
        //Enviamos la petición apuntando a la URL3 de Config.json ***aca necesitamos enviar en la URL el documents/{{document}}/{{file_id}}/url/pdf **
        cy.request({
            method: 'GET',
            url: `${config.URL3}`,
            failOnStatusCode: false,
        }).as('urlPDF')
         //Validamos status de respuesta
        cy.get('@urlPDF').its('status').should('eq', 200)
        //Validamos las propiedades de la respueta
        cy.get('@urlPDF').should(({response}) => {
            expect(response && response.body).to.have.property('status', 'success')
            expect(response && response.body).to.have.property('data', [])
        })
    })

})