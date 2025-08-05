import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendConfirmationEmail } from './resend-confirmation-email';

describe('ResendConfirmationEmail', () => {
  let component: ResendConfirmationEmail;
  let fixture: ComponentFixture<ResendConfirmationEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResendConfirmationEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendConfirmationEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
