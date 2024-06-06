import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCsvToTableComponent } from './load-csv-to-table.component';

describe('LoadCsvToTableComponent', () => {
  let component: LoadCsvToTableComponent;
  let fixture: ComponentFixture<LoadCsvToTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadCsvToTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadCsvToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
