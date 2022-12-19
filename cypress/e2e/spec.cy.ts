import {createComponent} from "@angular/core";

describe('Access to website', () => {

  beforeEach(() => {
    // When I go to '/'
    cy.visit('http://localhost:4200/')
  })


  it('should appear as the given mockup', () => {

      // Then I should not see a status (failed or success)
      cy.get('[data-cy-global-status]')
      .should("not.exist")
      // And I should not see any input error
      cy.get('[data-cy-email-error]')
      .should('not.exist')
      // And I should not see any input error
      cy.get('[data-cy-password-error]')
      .should('not.exist')
      // And I should see a form
      cy.get('form')
      // And I should see an input email
      cy.get('[data-cy-email]')
      // And I should see an input password
      cy.get('[data-cy-password]')
      // And I should see a submit button
      cy.get('[data-cy-submit]')
      // And I should see a link if I forgot my password
      cy.get('[data-cy-forget-password]')
      // And I should see a link to create a new account
      cy.get('[data-cy-new-account]')
  })


  it("should display error message if email input is empty after focus loss", () => {

    // When I let an empty input
    cy.get('[data-cy-email]').click()
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-email-error]')
      .should('be.visible')
      .should('contain.text', 'Addresse email incorrecte')
  })

  it("should display error message if password input is empty after focus loss", () => {

    // When I let an empty input
    cy.get('[data-cy-password]').click()
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-password-error]')
      .should('be.visible')
      .should('contain.text', 'Veuillez renseigner un mot de passe')
  })

  it("should reject false login user", () => {
    // Http setup to stub a failing API response
    cy.intercept('POST','https://localhost:8080/api/auth/login/', {
      statusCode:404,
      body:{
        password: "sdfsdf",
        email:'dddsfsdf'
      }
    })

    // When I type an invalid email
    cy.get('[data-cy-email]').type("notFoundEmail@example.fr")
    // When I type an invalid password
    cy.get('[data-cy-password]').type("falsePassword")
    // And I submit the form
    cy.get('[data-cy-submit]').click()
    // Then I should see an alert
    cy.get('[data-cy-global-status').should("exist")

  })

  it("should accept a valid security number", () => {


    // Http setup to stub a successful API responde
    cy.intercept('POST','https://localhost:8080/api/auth/login', {
      statusCode: 200,
      body:{
        password: "sdfsdf",
        email:'dddsfsdf'
      }
    })

    // When I type a valid email
    cy.get('[data-cy-email]').type("realUser@example.fr")
    // When I type a valid password
    cy.get('[data-cy-password]').type("realPassword")
    // And I submit the form
    cy.get('[data-cy-submit]').click()
    // Then I should see an alert
    cy.get('[data-cy-global-status').should("not.exist")

    cy.visit('http://localhost:4200/accueil')
    /*cy.url().should('be.equals', 'http://localhost:4200/accueil')*/

  })

})



