/// <reference types="Cypress" />

import config from '../integration/config.json'

describe('APi Test using Cypress', () => {
    it('API - Validate Headers', () => {
        cy.request({
            method: 'GET',
            url: `${config.URL}`,
            failOnStatusCode: false,
        }).as('poke')
        cy.get('@poke')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('API - Validate Status Code', () => {
        cy.request({
            method: 'GET',
            url: `${config.URL}`,
            failOnStatusCode: false,
        }).as('poke')
        cy.get('@poke').its('status').should('equal', 200)
    })

    it('API - Validate Content Values', () => {
        cy.request({
            method: 'GET',
            url: `${config.URL}`,
            failOnStatusCode: false,
        }).as('poke')
        cy.get('@poke').its('body').should('include', { name: 'pikachu' })
    })

    it('API - Validate Negative status code', () => {
        cy.request({
            method: 'GET',
            url: `${config.URL2}`,
            failOnStatusCode: false,
        }).as('poke')
        cy.get('@poke').its('status').should('equal', 404)
    })

    it.skip('API - Mocking a Response', () => {
        cy.intercept('GET', '/pokemon/*', {fixture:'tags.json'})
        cy.get('pokemon')

    })

})