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


describe("Inscription", () =>{
  beforeEach(() => {
    // When I go to '/'
    cy.visit('http://localhost:4200/')
    // When I click on the button create account
    cy.get('[data-cy-create-account]').click()
  })

  it("should open a modal when i want create an account like the given mockup", () =>{


    // Then I should not see a status (failed or success)
    cy.get('[data-cy-password-match-error]')
      .should("not.exist")
    // And I should not see any input error
    cy.get('[data-cy-password-error]')
      .should("not.exist")
    // And I should not see any input error
    cy.get('[data-cy-email-error]')
      .should('not.exist')
    // And I should not see any input error
    cy.get('[data-cy-formatName-error]')
      .should('not.exist')
    // And I should see a form
    cy.get('form')
    // And I should see an input firstname
    cy.get('[data-cy-firstname]')
    // And I should see an input name
    cy.get('[data-cy-name]')
    // And I should see an input email
    cy.get('[data-cy-email-signup]')
    // And I should see an input password
    cy.get('[data-cy-password-signup]')
    // And I should see an input password
    cy.get('[data-cy-match-password-signup]')
    // And I should see an inscription button
    cy.get('[data-cy-inscription]')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })


  it("should display error message if name input is empty after focus loss", () => {

    // When I let an empty input
    cy.get('[ data-cy-firstname]').click()
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-formatFirstname-error]')
      .should('be.visible')
      .should('contain.text', 'prénom requis')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if firstname is less than 2 carachters", () => {
    // When I let an empty input with less than 2 caracteres
    cy.get('[ data-cy-firstname]').type("a")
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-formatFirstname-error]')
      .should('be.visible')
      .should('contain.text', 'Pas de chiffre dans le prénom')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if name input is empty after focus loss", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I let an empty input
    cy.get('[ data-cy-name]').click()
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-formatName-error]')
      .should('be.visible')
      .should('contain.text', 'nom requis')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if firstname is less than 2 characters", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I let an empty input with less than 2 characters
    cy.get('[ data-cy-name]').type("a")
    // And I click everywhere not in the input
    cy.get('body').click(100,200, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-formatName-error]')
      .should('be.visible')
      .should('contain.text', 'Pas de chiffre dans le nom')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if email is empty", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I let an empty input with less than 2 characters
    cy.get('[ data-cy-email-signup]').click()
    // And I click everywhere not in the input
    cy.get('body').click(50,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-email-error]')
      .should('be.visible')
      .should('contain.text', 'email requis')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if email is not well formated", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I type a bad email
    cy.get('[ data-cy-email-signup]').type('1524')
    // And I click everywhere not in the input
    cy.get('body').click(300,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-email-error]')
      .should('be.visible')
      .should('contain.text', 'Veuillez renseigner un format valide')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if password is empty", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I type a good email
    cy.get('[ data-cy-email-signup]').type('test@exemple.fr')
    // When I let an empty input
    cy.get('[ data-cy-password-signup]').click()
    // And I click everywhere not in the input
    cy.get('body').click(300,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-password-error]')
      .should('be.visible')
      .should('contain.text', 'mot de passe requis')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if password is not well formated", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I type a good email
    cy.get('[ data-cy-email-signup]').type('test@exemple.fr')
    // When I let an empty input
    cy.get('[ data-cy-password-signup]').type("15sa")
    // And I click everywhere not in the input
    cy.get('body').click(300,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-password-error]')
      .should('be.visible')
      .should('contain.text', 'Le mot de passe doit comporter 1 chiffre, 1 majuscule')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should display error message if password doesn't match", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I type a good email
    cy.get('[ data-cy-email-signup]').type('test@exemple.fr')
    // When I type a good password
    cy.get('[ data-cy-password-signup]').type("Tsdfddes1")
    // When I type a false confirm password
    cy.get('[ data-cy-match-password-signup]').type("testFalse1")
    // And I click everywhere not in the input
    cy.get('body').click(300,50, {force:true})
    // Then I should see an input error
    cy.get('[data-cy-passwordMatch-error]')
      .should('be.visible')
      .should('contain.text', 'Les mots de passes ne correspondent pas')
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('exist')
  })

  it("should be possible to click on the inscription button if the form is valid", () => {
    // When I type a good firstname
    cy.get('[ data-cy-firstname]').type("Marc")
    // When I type a good name
    cy.get('[ data-cy-name]').type("Do")
    // When I type a good email
    cy.get('[ data-cy-email-signup]').type('test@exemple.fr')
    // When I type a good password
    cy.get('[ data-cy-password-signup]').type("Testpassword1")
    // When I type a false confirm password
    cy.get('[ data-cy-match-password-signup]').type("Testpassword1")
    // And the button should be disabled
    cy.get('[data-cy-inscription]').invoke('attr', "disabled").should('not.exist')
    // Then I can click on the button inscription
    cy.get('[data-cy-inscription').click()
  })
})
