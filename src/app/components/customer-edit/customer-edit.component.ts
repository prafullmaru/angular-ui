import { Component } from '@angular/core';
import 'ids-enterprise-wc';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {
  customerName: any;
  mappingGroupName: any;
  status: any;

  selectedData: any[] | undefined;
  static instance: CustomerEditComponent;
  constructor(private dataService: DataService) {
    CustomerEditComponent.instance = this;
  }

  ngOnInit() {
    this.dataService.selectedData$.subscribe(data => {
      this.selectedData = data;
      this.customerName = data[0].customerName
      this.mappingGroupName = data[0].mapGroupInfo.mapGroupName
      if(data[0].status = "null"){
        this.status = "null"
      }
      else {
        this.status = data[0].status
      }
      console.log("this.customerName", this.customerName)
      console.log("this.status", this.status)
    });
  }
  clearForm() {
    const form = document.querySelector('#customer-edit-form') as any;
    form.querySelector('#customer-edit-status').value = '';
    console.log("this.status", this.status)
  }

}
