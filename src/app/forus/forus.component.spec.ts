import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForusComponent } from './forus.component';

describe('ForusComponent', () => {
  let component: ForusComponent;
  let fixture: ComponentFixture<ForusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForusComponent]
    });
    fixture = TestBed.createComponent(ForusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
