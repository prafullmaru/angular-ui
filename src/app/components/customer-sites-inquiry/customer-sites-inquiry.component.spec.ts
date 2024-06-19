import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSitesInquiryComponent } from './customer-sites-inquiry.component';

describe('CustomerSitesInquiryComponent', () => {
  let component: CustomerSitesInquiryComponent;
  let fixture: ComponentFixture<CustomerSitesInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSitesInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSitesInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
