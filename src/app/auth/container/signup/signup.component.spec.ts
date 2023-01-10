import {createRoutingFactory, SpectatorRouting} from "@ngneat/spectator";

import {MaterialModule} from "../../../shared/layouts/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconTestingModule} from "@angular/material/icon/testing";
import {AuthService} from "../../../shared/services/auth-service/auth.service";

import {SignupComponent} from "./signup.component";

describe('Signing Checker', ()=> {
  let spectator: SpectatorRouting<SignupComponent>;


  const createComponent = createRoutingFactory({
    component: SignupComponent,
    imports: [MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconTestingModule],
    mocks: [AuthService],

  });

  beforeEach(async () => {
    spectator = createComponent()
  });

  it("should appear as the given mockup", ()=>{


    expect(spectator.query('form')).toBeTruthy();

    expect(spectator.query('input[name="firstname"]')).toBeTruthy();

    expect(spectator.query('input[name="emailSignup"]')).toBeTruthy();

    expect(spectator.query('input[name="name"]')).toBeTruthy();

    expect(spectator.query('input[name="passwordSignup"]')).toBeTruthy();

    expect(spectator.query('input[name="matchPasswordSignup"]')).toBeTruthy();

    expect(spectator.query('form button')).toBeTruthy()


    expect(spectator.query('[data-cy-password-match]')).toBeNull()

    expect(spectator.query('[data-cy-email-error]')).toBeNull()
    expect(spectator.query('[data-cy-formatFirstname-error]')).toBeNull()
    expect(spectator.query('[data-cy-formatName-error]')).toBeNull()
  });

  it("should display error message if input firstname is empty",  () => {


    spectator.typeInElement('', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatFirstname-error]')).toBeTruthy()
  });

  it("should display error message if firstname have numeric",  () => {


    spectator.typeInElement('157451', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatFirstname-error]')).toBeTruthy()
  });

  it("should display error message if firstname less than 2 charachter",  () => {


    spectator.typeInElement('a', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatFirstname-error]')).toBeTruthy()
  });


  it("should display error message if input name is empty",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatName-error]')).toBeTruthy()
  });

  it("should display error message if name have numeric",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('12t', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatName-error]')).toBeTruthy()
  });

  it("should display error message if name  less than 2 charachter",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('t', 'input[name="name"]')
    spectator.typeInElement('test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-formatName-error]')).toBeTruthy()
  });

  it("should display error message if input email is empty",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-email-error]')).toBeTruthy()
  });

  it("should display error message if email is not well formated",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('155qsd', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-email-error]')).toBeTruthy()
  });

  it("should display error message if input password is empty",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('Test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-password-error]')).toBeTruthy()
  });

  it("should display error message if password is too easy",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('Test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('12s', 'input[name="passwordSignup"]')
    spectator.typeInElement('password', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-password-error]')).toBeTruthy()
  });


  it("should display error message if passwords don't match",  () => {


    spectator.typeInElement('Test', 'input[name="firstname"]')
    spectator.typeInElement('Test', 'input[name="name"]')
    spectator.typeInElement('Test@test.fr', 'input[name="emailSignup"]')
    spectator.typeInElement('password', 'input[name="passwordSignup"]')
    spectator.typeInElement('passwordFaild', 'input[name="matchPasswordSignup"]')
    expect(spectator.query('[data-cy-passwordMatch-error]')).toBeTruthy()
  });


})
