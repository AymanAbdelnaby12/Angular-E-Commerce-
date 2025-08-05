import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEmail } from './confirmation-email';

describe('ConfirmationEmail', () => {
  let component: ConfirmationEmail;
  let fixture: ComponentFixture<ConfirmationEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
