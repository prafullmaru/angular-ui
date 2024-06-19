import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent implements OnInit {

  customerName: string = '';
  mappingGroupName: string = '';
  selectedEditStatus: string = '';
  checked: boolean = false;
  selectedData: any;
  static instance: CustomerEditComponent;
  constructor(
    private dataService: DataService,
    private apiService: ApiService,
  ) {
    CustomerEditComponent.instance = this;
  }

  ngOnInit() {
    const form = document.querySelector('#customer-edit-form') as any;
    const submitButton = document.querySelector('#btn-submit-edit') as any;

    this.dataService.selectedData$.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedData = data[0];
        this.updateForm(this.selectedData);
      }
    });

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        this.submitEditForm(this.selectedData);
      } else {
        console.error('Form is invalid');
      }
    });

    submitButton?.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }

  updateForm(data: any) {
    this.customerName = data.customerName;
    this.mappingGroupName = data.mapGroupInfo?.mapGroupName ?? 'null';
    this.checked = data.isEnabled === 1;    
  }

  setSelectedEditStatus(event: Event) {
    this.selectedEditStatus = (event.target as HTMLSelectElement).value;
    
    if (this.selectedData) {
      this.selectedData.status = this.selectedEditStatus;
    }
    console.log("this.selectedEditStatus", this.selectedEditStatus)
  }

  submitEditForm(formData: any) {
    this.apiService.updateCustomer(formData).subscribe({
      next: (response) => {
        console.info('Form Submitted', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }

  clearForm() {
    const form = document.querySelector('#customer-edit-form') as any;
    form.querySelector('#customer-edit-status').value = '';
  }

  onUpdate(event: any): void {
    this.checked = event.target.checked;

    if (this.selectedData) {
      this.selectedData.isEnabled = this.checked ? 1 : 0;
    }
  }
}
