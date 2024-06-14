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

selectedData: any[] | undefined;
constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.selectedData$.subscribe(data => {
    this.selectedData = data;
    this.customerName = data[0].customerName
    this.mappingGroupName = data[0].mapGroupInfo.mapGroupName
    console.log("this.customerName", this.customerName)
  });
}
}
