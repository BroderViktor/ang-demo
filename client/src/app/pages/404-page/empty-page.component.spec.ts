import { NO_ERRORS_SCHEMA } from "@angular/core";
import { EmptyPageComponent } from "./empty-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("EmptyPageComponent", () => {

  let fixture: ComponentFixture<EmptyPageComponent>;
  let component: EmptyPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [EmptyPageComponent]
    });

    fixture = TestBed.createComponent(EmptyPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
