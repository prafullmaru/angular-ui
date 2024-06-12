import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../app/services/api.service';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit, AfterViewInit {

  static instance: CustomerNewComponent;
  customerName: string = '';
  selectedSourceProduct: string = '';
  selectedSourceVersion: string = '';
  selectedTargetProduct: string = '';
  sourceVersions: string[] = [];
  mappingGroupName: string = '';

  sourceProducts: any[] = [];
  targetProducts: any[] = [];
  allMapGroups: any[] = [];
  formData: any[] = [];

  constructor(private apiService: ApiService) {
    CustomerNewComponent.instance = this;
  }
  container: any;

  ngOnInit() {
    this.container = document.querySelector('ids-form');
    this.fetchProducts();
    this.loadFormData();
  }

  ngAfterViewInit() {
    const form = document.querySelector('#sample-form') as any;
    const submitButton = document.querySelector('#btn-submit') as any;

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        this.populateFormData(form);
        this.submitForm(this.formData);
      } else {
        console.error('Form is invalid');
      }
    });

    submitButton?.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }

  populateFormData(form: any) {
    this.formData = this.formData.map(item => {
      switch (item.paramName) {
        case 'CustomerName':
          item.paramValue = form.querySelector('#customerName').value;
          break;
        case 'LS_SRC_PREFIX':
          item.paramValue = form.querySelector('#linkedServer').value;
          break;
        case 'MapGroupName':
          item.paramValue = this.mappingGroupName;
          break;
        case 'SRC_PREFIX':
          item.paramValue = form.querySelector('#sourceDatabase').value;
          break;
        default:
          break;
      }
      return item;
    });
  }

  submitForm(formData: any) {
    this.apiService.submitForm(formData).subscribe({
      next: (response) => {
        this.handleToast();
        console.info('Form Submitted', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }

  handleToast() {
    const toastId = 'test-demo-toast';
    let toast: any = document.querySelector(`#${toastId}`);
    if (!toast) {
      toast = document.createElement('ids-toast');
      toast.setAttribute('id', toastId);
      this.container?.appendChild(toast);
    }
    toast.show({
      title: 'New Customer',
      message: 'Saved'
    });
  }

  fetchProducts() {
    this.apiService.getMapGroups().subscribe({
      next: (data: any[]) => {
        console.log('API Response:', data);
        this.processResponse(data);
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      }
    });
  }

  loadFormData() {
    this.apiService.getFormData().subscribe({
      next: (data: any[]) => {
        console.log('Form Data:', data);
        this.formData = data;
      },
      error: (error: any) => {
        console.error('Error loading form data', error);
      }
    });
  }

  processResponse(data: any[]) {
    const sourceProductsMap = new Map<string, Set<string>>();
    const targetProductsMap = new Map<string, Set<string>>();

    this.allMapGroups = data;

    data.forEach((item: any) => {
      if (!sourceProductsMap.has(item.sourceProduct)) {
        sourceProductsMap.set(item.sourceProduct, new Set<string>());
      }
      sourceProductsMap.get(item.sourceProduct)!.add(item.sourceProductVersion || '');

      if (!targetProductsMap.has(item.sourceProduct)) {
        targetProductsMap.set(item.sourceProduct, new Set<string>());
      }
      targetProductsMap.get(item.sourceProduct)!.add(item.targetProduct);
    });

    this.sourceProducts = Array.from(sourceProductsMap.keys()).map(product => ({
      name: product,
      versions: Array.from(sourceProductsMap.get(product)!)
    }));

    this.targetProducts = Array.from(targetProductsMap.keys()).map(product => ({
      name: product,
      targets: Array.from(targetProductsMap.get(product)!)
    }));
  }

  setVersionsForSelectedSourceProduct(event: Event) {
    const selectedSourceValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Source Product:', selectedSourceValue);
    this.selectedSourceProduct = selectedSourceValue;
    const selectedProduct = this.sourceProducts.find(product => product.name === selectedSourceValue);
    this.sourceVersions = selectedProduct ? selectedProduct.versions : [];

    this.targetProducts = this.allMapGroups
      .filter(item => item.sourceProduct === selectedSourceValue)
      .map(item => item.targetProduct)
      .filter((value, index, self) => self.indexOf(value) === index);

    console.log('Available Versions:', this.sourceVersions);
    console.log('Available Target Products:', this.targetProducts);
    this.selectedSourceVersion = '';
    this.selectedTargetProduct = '';
    this.clearFields();
    this.updateMappingGroupName();
  }

  setSelectedSourceVersion(event: Event) {
    const selectedVersionValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Source Version:', selectedVersionValue);
    this.selectedSourceVersion = selectedVersionValue;
    this.updateMappingGroupName();
  }

  setSelectedTargetProduct(event: Event) {
    const selectedTargetValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Target Product:', selectedTargetValue);
    this.selectedTargetProduct = selectedTargetValue;
    this.updateMappingGroupName();
  }

  updateMappingGroupName() {
    this.mappingGroupName = this.getMappingGroupName();
  }

  getMappingGroupName(): string {
    const selectedMapGroup = this.allMapGroups.find(group => 
      group.sourceProduct === this.selectedSourceProduct &&
      group.sourceProductVersion === this.selectedSourceVersion &&
      group.targetProduct === this.selectedTargetProduct
    );
    return selectedMapGroup ? selectedMapGroup.mapGroupName : '';
  }

  clearFields(){
    const form = document.querySelector('#sample-form') as any;
    form.querySelector('#sourceProductDropdown').value[0]
    form.querySelector('#sourceVersionDropdown').value = '';
    form.querySelector('#targetProductDropdown').value = '';
    // form.querySelector('#sourceDatabase').value = '';
    // form.querySelector('#linkedServer').value = '';
  }

  clearForm() {
    this.selectedSourceVersion = '';
    this.selectedTargetProduct = '';
    const form = document.querySelector('#sample-form') as any;
    form.querySelector('#customerName').value = '';
    form.querySelector('#sourceProductDropdown').value = '';
    form.querySelector('#sourceVersionDropdown').value = '';
    form.querySelector('#targetProductDropdown').value = '';
    form.querySelector('#sourceDatabase').value = '';
    form.querySelector('#linkedServer').value = '';
  }
}
