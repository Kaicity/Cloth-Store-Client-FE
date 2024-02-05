import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessStatusComponent } from './sucess-status.component';

describe('SucessStatusComponent', () => {
  let component: SucessStatusComponent;
  let fixture: ComponentFixture<SucessStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessStatusComponent]
    });
    fixture = TestBed.createComponent(SucessStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
