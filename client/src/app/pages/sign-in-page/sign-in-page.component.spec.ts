import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SignInPageComponent } from "./sign-in-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SignInPageComponent", () => {

  let fixture: ComponentFixture<SignInPageComponent>;
  let component: SignInPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SignInPageComponent]
    });

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
