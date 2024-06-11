import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';
import formDataJSON from "../../../api/form-data.json";

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

  constructor(private http: HttpClient) { }

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
      field: 'MappingGroupName',
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

    // Fetch data from form-data.json src/api/*.json
    this.http.get<any[]>('../../../api/form-data.json')
      .subscribe(res => {
        this.dataGrid.nativeElement.columns = this.columns;
        this.dataGrid.nativeElement.data = res;
      });
  }
}