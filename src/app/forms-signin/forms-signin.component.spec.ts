import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSigninComponent } from './forms-signin.component';

describe('FormsSigninComponent', () => {
  let component: FormsSigninComponent;
  let fixture: ComponentFixture<FormsSigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsSigninComponent]
    });
    fixture = TestBed.createComponent(FormsSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
