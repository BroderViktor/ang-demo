import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HomepageComponent } from "./homepage.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("HomepageComponent", () => {

  let fixture: ComponentFixture<HomepageComponent>;
  let component: HomepageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [HomepageComponent]
    });

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
