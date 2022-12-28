import {createHttpFactory, HttpMethod, SpectatorHttp} from "@ngneat/spectator";
import {AuthService} from "./auth.service";



describe("Auth Service", () => {

  let spectator: SpectatorHttp<AuthService>
  const createSpectator = createHttpFactory({
    service: AuthService
  })


  beforeEach(() => spectator = createSpectator())


  it("should return false if the API give 404 status", (done) => {
    spectator.service.login("userCredential","password").subscribe((result) => {
      expect(result).toBeFalse()

    },
      error => {
      expect(error).toBeTruthy()
        done()
      })


    const request = spectator.expectOne("https://localhost:8080/api/auth/login", HttpMethod.POST)

    const status = 404;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    request.error(
      errorEvent,
      { status, statusText }
    );

  })

  it("should return true if the API give 200 status", (done) => {

    spectator.service.login("userCredential","password").subscribe((result) => {
      expect(result).toBeTruthy()
      done()
    })

    const request = spectator.expectOne("https://localhost:8080/api/auth/login", HttpMethod.POST)

    request.flush("OK", {
      status:200,
      statusText: 'OK'
    })
  })

  /*it("should return a message if the API give 200 status when i create a user", (done) => {

    spectator.service.signup("test", "test", "test@test.fr", "testPassword").subscribe((result) => {
      expect(result).toBeTruthy()
      done()
    })

    const request = spectator.expectOne("https://localhost:8080/api/auth/signup", HttpMethod.POST)

    request.flush("Ok", {
      status:200,
      statusText: 'OK'
    })
  })*/
})
