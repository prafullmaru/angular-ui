import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import IdsDataGrid from 'ids-enterprise-wc/components/ids-data-grid/ids-data-grid';
import 'ids-enterprise-wc/enterprise-wc.js';
import { DataService } from '../../services/data.service';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerNewComponent } from '../customer-new/customer-new.component';
@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', { read: ElementRef }) modal: any;
  @ViewChild('appMenuDrawer', { read: ElementRef }) appMenuDrawer!: ElementRef<HTMLElement>;
  @ViewChild('appMenuTriggerBtn', { read: ElementRef }) appMenuTriggerBtn!: ElementRef<HTMLElement>;

  public disabled: boolean = true;
  constructor(private router: Router, private dataService: DataService) {}

  currentTitle = 'Welcome! ';
  currentRoute!: string;


  navigateTo(screen: string) {
    const screenTitles: { [key: string]: string } = {
      'customer-new': 'New Customer',
      'customer-inquiry': 'Customer<br> Inquiry',
      'customer-edit': 'Customer<br> Edit',
      'load-to-csi': 'Extract, Transform, Load<br>Load Data Extracts',
      'load-csv-to-table': 'Extract, Transform, Load<br>Import CSV File To Table',
      'customer-site-reference-x-ref-new' : 'Customer<br>Site Reference X-Ref New'
    };
  
    this.currentTitle = screenTitles[screen] || 'Title';
    this.router.navigate([`/${screen}`]);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
  }

  ngAfterViewInit(): void {
    (this.appMenuDrawer.nativeElement as any).target = this.appMenuTriggerBtn.nativeElement;
  }

  disableTriggerButton() {
    this.disabled = true;
  }

  enableTriggerButton() {
    this.disabled = true;
  }

  handleSelected(e: CustomEvent) {
    // console.info(`Header "${(e.target as any).textContent.trim()}" was selected.`);
    console.log('Selected event: ', e.detail);

  }

  cancelForm(type: string) {
    console.log(`Cancel ${type} action triggered`);
    const componentInstance = type === 'new' ? CustomerNewComponent.instance : 
                              type === 'edit' ? CustomerEditComponent.instance : 
                              null;
    if (componentInstance) {
        componentInstance.clearForm();
    } else {
        console.error(`${type === 'new' ? 'Customer-new' : 'CustomerEdit'} not available`);
    }
}


  bolt() {
    console.log('Bolt action triggered');
  }

  rejectedOutline() {
    this.modal.nativeElement.show();
    console.log('Rejected Outline action triggered');
  }

  yesModalRedirectTo() {
    this.navigateTo('/')
  }

  edit() {
    this.navigateTo("customer-edit")
    console.log('Edit action triggered')
    const dataGrid = document.querySelector<IdsDataGrid>('#data-grid-editable')!;
    const selectedData = dataGrid.selectedRows.map((row: any) => row.data);
    console.log("selectedData",selectedData)
    this.dataService.setSelectedData(selectedData);
  }

  add() {
    console.log('add action triggered')
    this.navigateTo("customer-new");  
  }
  copy() {
    console.log('Copy action is triggered')
  }
  search() {}
  filter() {}
}
