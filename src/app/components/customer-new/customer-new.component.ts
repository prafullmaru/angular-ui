import { Component } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent {

  static instance: CustomerNewComponent;
  constructor() {
    CustomerNewComponent.instance = this;
  }

  ngAfterViewInit() {
    const form = document.querySelector('#sample-form') as any;
    const submitButton = document.querySelector('#btn-submit') as any;

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        console.info('Form Submitted', {
          customerName: form.querySelector('#customerName').value,
          selectedSourceProduct: form.querySelector('#sourceProductDropdown').value,
          selectedTargetProduct: form.querySelector('#targetProductDropdown').value,
          selectedSourceVersion: form.querySelector('#sourceVersionDropdown').value,
          mappingGroupName: form.querySelector('#mappingGroupName').value
        });
      } else {
        console.error('Form is invalid');
      }
    });

    submitButton?.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }




  customerName: string = '';
  selectedSourceProduct: string = '';
  selectedSourceVersion: string = '';
  selectedTargetProduct: string = '';
  sourceVersions: string[] = [];
  mappingGroupName: string = '';

  setVersionsForSelectedSourceProduct(event: Event) {
    const selectedSourceValue = (event.target as HTMLSelectElement).value;
    this.selectedSourceProduct = selectedSourceValue;
    if (this.selectedSourceProduct === 'fc') {
      this.sourceVersions = ['2', '2.5', '3'];
    } else if (this.selectedSourceProduct === 'syt') {
      this.sourceVersions = ['4'];
    } else if (this.selectedSourceProduct === 'b4') {
      this.sourceVersions = ['5'];
    }
    this.selectedSourceVersion = '';
    this.updateMappingGroupName();
  }

  setSelectedSourceVersion(event: Event) {
    const selectedVersionValue = (event.target as HTMLSelectElement).value;
    this.selectedSourceVersion = selectedVersionValue;
    this.updateMappingGroupName();
  }

  setSelectedTargetProduct(event: Event) {
    const selectedTargetValue = (event.target as HTMLSelectElement).value;
    this.selectedTargetProduct = selectedTargetValue;
    this.updateMappingGroupName();
  }

  updateMappingGroupName() {
    console.log('Selected Source Product:', this.selectedSourceProduct);
    console.log('Selected Source Version:', this.selectedSourceVersion);
    console.log('Selected Target Product:', this.selectedTargetProduct);

    if (this.selectedSourceProduct && this.selectedSourceVersion && this.selectedTargetProduct) {
      const sourceText = this.getSourceProductName(this.selectedSourceProduct);
      this.mappingGroupName = `${sourceText}(${this.selectedSourceVersion})To${this.getTargetProductName(this.selectedTargetProduct)}`;
    } else {
      this.mappingGroupName = '';
    }
    console.log('Mapping Group Name:', this.mappingGroupName);
  }

  getSourceProductName(productId: string): string {
    const productMap: { [key: string]: string } = {
      fc: 'Facts',
      syt: 'Syteline',
      b4: 'Baan4'
    };
    return productMap[productId] || '';
  }

  getTargetProductName(productId: string): string {
    const productMap: { [key: string]: string } = {
      csi: 'Cloud Suite Industrial (CSI)',
      ln: 'Infor LN',
      csf: 'CSF'
    };
    return productMap[productId] || '';
  }

  clearForm() {
    const form = document.querySelector('#sample-form') as any;
    form.querySelector('#sourceProductDropdown').value=''
  }
}
