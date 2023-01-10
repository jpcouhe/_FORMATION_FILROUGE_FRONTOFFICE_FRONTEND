import {createComponentFactory, createRoutingFactory, Spectator, SpectatorRouting} from "@ngneat/spectator";
import {LoginComponent} from "./login.component";


import {MaterialModule} from "../../../shared/layouts/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatIconTestingModule} from "@angular/material/icon/testing";

import {AuthService} from "../../../shared/services/auth-service/auth.service";
import {BehaviorSubject, of, throwError} from "rxjs";
import {UserService} from "../../../shared/services/user-service/user.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";








describe('Login Checker', ()=>{
  let spectator: SpectatorRouting<LoginComponent>;


  const createComponent = createRoutingFactory({
    component:LoginComponent,
    imports: [ MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconTestingModule,
      HttpClientTestingModule],
    providers: [{
      provide: UserService, userValue: {user$: new BehaviorSubject({})}
    }],
    mocks: [AuthService],

  });

  beforeEach(async () => {
    spectator = createComponent()
  });

  it("should appear as the given mockup", ()=>{

    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))

    expect(spectator.query('form')).toBeTruthy();

    expect(spectator.query('input[name="email"]')).toBeTruthy();

    expect(spectator.query('input[name="password"]')).toBeTruthy();

    expect(spectator.query('form button')).toBeTruthy()

    expect(spectator.query('[data-cy-new-account]')).toBeTruthy()

    expect(spectator.query('[data-cy-forget-password]')).toBeTruthy()



    expect(spectator.query('[data-cy-global-status]')).toBeNull()

    expect(spectator.query('[data-cy-email-error]')).toBeNull()

    expect(spectator.query('[data-cy-password-error]')).toBeNull()
  });

  // Email Test

  it("should display error message if input email is empty",  () => {
    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))


    spectator.typeInElement('', 'input[name="email"]')
    spectator.typeInElement('password', 'input[name="password"]')

    expect(spectator.query('[data-cy-email-error]')).toBeTruthy()
  });

  it("should display an error message if the email is not well formated",  () => {
    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))

    spectator.typeInElement('sdfdfsdfs', 'input[name="email"]')
    spectator.typeInElement('password', 'input[name="password"]')

    expect(spectator.query('[data-cy-email-error]')).toBeTruthy()
  });

  it("should not display error message for valid email",  () => {
    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))

    spectator.typeInElement('test@test.fr', 'input[name="email"]')
    spectator.typeInElement('password', 'input[name="password"]')

    expect(spectator.query('[data-cy-email-error]')).toBeFalsy()
  });

  it("should display error message if input password is empty",  () => {
    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))

    spectator.typeInElement('', 'input[name="password"]')
    spectator.typeInElement('test@test.fr', 'input[name="email"]')

    expect(spectator.query('[data-cy-password-error]')).toBeTruthy()
  });

  it('should reject invalid user', ()=>{
      const service = spectator.inject(AuthService)
      /*service.login.and.returnValue(of(false))*/
      service.login.and.returnValue(throwError(() => new Error("a error message")));

      spectator.typeInElement('notFoundEmail@example.fr', 'input[name="email"]')
      spectator.typeInElement('falsePassword', 'input[name="password"]')
      spectator.click('form button')

      expect(spectator.query('[data-cy-global-status]')).toBeTruthy()
  })


  it('should accept valid user', ()=>{

    const service = spectator.inject(AuthService)
    service.login.and.returnValue(of(true))

    spectator.typeInElement('FoundEmail@example.fr', 'input[name="email"]')
    spectator.typeInElement('Password', 'input[name="password"]')
    spectator.click('[data-cy-submit]')

    expect(spectator.query('[data-cy-global-status]')).toBeFalsy()
  })

})
