import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadToCSIComponent } from './load-to-csi.component';

describe('LoadToCSIComponent', () => {
  let component: LoadToCSIComponent;
  let fixture: ComponentFixture<LoadToCSIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadToCSIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadToCSIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
