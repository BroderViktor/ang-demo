import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SignUpPageComponent } from "./sign-up-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SignUpPageComponent", () => {

  let fixture: ComponentFixture<SignUpPageComponent>;
  let component: SignUpPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SignUpPageComponent]
    });

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
