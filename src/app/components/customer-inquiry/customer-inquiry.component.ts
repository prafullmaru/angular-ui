import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';
import formDataJSON from "../../../api/form-data.json";
import { ApiService } from '../../../app/services/api.service';

interface GridColumn {
  id: string;
  name: string;
  field?: string;
  formatter: any;
  filterType?: any;
  sortable: boolean;
  resizable?: boolean;
  align?: string;
  readonly?: boolean;
  width?: number;
}

@Component({
  selector: 'app-customer-inquiry',
  templateUrl: './customer-inquiry.component.html',
  styleUrls: ['./customer-inquiry.component.scss']
})
export class CustomerInquiryComponent implements AfterViewInit {
  @ViewChild('dataGrid', { read: ElementRef }) dataGrid!: ElementRef;
  public columns: GridColumn[] = [];
  public url: any = formDataJSON;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngAfterViewInit(): void {
    this.columns.push({
      id: 'selectionRadio',
      name: 'selection',
      sortable: false,
      resizable: false,
      formatter: this.dataGrid.nativeElement.formatters.selectionRadio,
      align: 'center'
    });
    this.columns.push({
      id: 'rowNumber',
      name: '#',
      field: 'rowNumber',  
      formatter: this.dataGrid.nativeElement.formatters.rowNumber,
      sortable: false,
      readonly: true,
      width: 50
    });
    this.columns.push({
      id: 'customerName',
      name: 'Customer Name',
      field: 'customerName',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,  
      resizable: true,
    });
    this.columns.push({
      id: 'sourceProduct',
      name: 'Source Product',
      field: 'sourceProduct',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,

    });
    this.columns.push({
      id: 'sourceProductVersion',
      name: 'Source Product Version',
      field: 'sourceProductVersion',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,

    });
    this.columns.push({
      id: 'targetProduct',
      name: 'Target Product',
      field: 'targetProduct',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,

    });
    this.columns.push({
      id: 'MappingGroupName',
      name: 'Mapping Group Name',
      field: 'mapGroupName',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,
    });
    this.columns.push({
      id: 'activeCheckbox',
      name: 'Active',
      field: 'Active',
      sortable: true,
      resizable: true,
      formatter: this.dataGrid.nativeElement.formatters.checkbox,
      align: 'center',

    });

  

      this.apiService.getMapGroups().subscribe({
        next: (data: any[]) => {
          this.dataGrid.nativeElement.columns = this.columns;
        this.dataGrid.nativeElement.data = data;;
        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        }
      });
    
  }
}