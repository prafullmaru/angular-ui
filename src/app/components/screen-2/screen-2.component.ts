import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

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
  selector: 'app-screen-2',
  templateUrl: './screen-2.component.html',
  styleUrls: ['./screen-2.component.scss']
})
export class Screen2Component implements AfterViewInit {
  @ViewChild('dataGrid', { read: ElementRef }) dataGrid!: ElementRef;
  public columns: GridColumn[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.columns.push({
      id: 'selectionCheckbox',
      name: 'selection',
      sortable: false,
      resizable: false,
      formatter: this.dataGrid.nativeElement.formatters.selectionCheckbox,
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
      width: 250
    });
    this.columns.push({
      id: 'sourceProduct',
      name: 'Source Product',
      field: 'sourceProduct',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,
      width: 250

    });
    this.columns.push({
      id: 'sourceProductVersion',
      name: 'Source Product Version',
      field: 'sourceProductVersion',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,
      width: 250

    });
    this.columns.push({
      id: 'targetProduct',
      name: 'Target Product',
      field: 'targetProduct',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: true,
      width: 250

    });
    this.columns.push({
      id: 'MappingGroupName',
      name: 'Mapping Group Name',
      field: 'MappingGroupName',
      formatter: this.dataGrid.nativeElement.formatters.text,
      // filterType: this.dataGrid.nativeElement.filters.text,
      sortable: true,
      resizable: false,

    });

    // Fetch data from form-data.json src/api/*.json
    this.http.get<any[]>('../../../api/form-data.json')
      .subscribe(res => {
        this.dataGrid.nativeElement.columns = this.columns;
        this.dataGrid.nativeElement.data = res;
      });
  }
}
