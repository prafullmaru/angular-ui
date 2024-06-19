import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteXRefNewComponent } from './customer-site-x-ref-new.component';

describe('CustomerSiteXRefNewComponent', () => {
  let component: CustomerSiteXRefNewComponent;
  let fixture: ComponentFixture<CustomerSiteXRefNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSiteXRefNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSiteXRefNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
