import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorToastCTAComponent } from './error-toast-cta.component';

describe('ErrorToastCTAComponent', () => {
  let component: ErrorToastCTAComponent;
  let fixture: ComponentFixture<ErrorToastCTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorToastCTAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorToastCTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
