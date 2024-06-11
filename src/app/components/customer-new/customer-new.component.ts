import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

interface MapGroup {
  mapGroupID: number;
  mapGroupName: string;
  mapGroupDesc: string;
  sourceProduct: string;
  sourceProductVersion: string;
  targetProduct: string;
  dbType: string;
  dbVersion: string;
}


@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent {

  static instance: CustomerNewComponent;
  customerName: string = '';
  selectedSourceProduct: string = '';
  selectedSourceVersion: string = '';
  selectedTargetProduct: string = '';
  sourceVersions: string[] = [];
  mappingGroupName: string = '';

  sourceProducts: any[] = [];
  targetProducts: any[] = [];
  constructor(private http: HttpClient) {
    CustomerNewComponent.instance = this;
  }

  ngOnInit() {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    const form = document.querySelector('#sample-form') as any;
    const submitButton = document.querySelector('#btn-submit') as any;

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        this.submitForm(
          [
            {
              "requestID": "null",
              "loaderName": "NewCustomer",
              "paramName": "CustomerName",
              "paramValue": form.querySelector('#customerName').value,
              "variablename": "null",
              "skipValue": "null",
              "primaryMapCode": "null",
              "secondaryMapCode": "null"
            },
            {
              "requestID": "null",
              "loaderName": "NewCustomer",
              "paramName": "LS_SRC_PREFIX",
              "paramValue":  form.querySelector('#linkedServer').value,
              "variablename": "null",
              "skipValue": "null",
              "primaryMapCode": "null",
              "secondaryMapCode": "null"
            },
            {
              "requestID": "null",
              "loaderName": "NewCustomer",
              "paramName": "MapGroupName",
              "paramValue": form.querySelector('#mappingGroupName').value,
              "variablename": "test",
              "skipValue": "null",
              "primaryMapCode": "null",
              "secondaryMapCode": "null"
            },
            {
              "requestID": "null",
              "loaderName": "NewCustomer",
              "paramName": "SRC_PREFIX",
              "paramValue": form.querySelector('#sourceDatabase').value,
              "variablename": "null",
              "skipValue": "null",
              "primaryMapCode": "null",
              "secondaryMapCode": "null"
            }
          ]
      
      );
      } else {
        console.error('Form is invalid');
      }
    });

    submitButton?.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }

  submitForm(formData: any) {
    this.http.post('http://54.163.252.133:8080/api/v1/elParamsList', formData).subscribe({
      next: (response) => {
        console.info('Form Submitted', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });
  }

  fetchProducts() {
    this.http.get<MapGroup[]>('http://54.163.252.133:8080/api/v1/mapGroups').subscribe(
      {
      next: (data: MapGroup[]) => {
        console.log('API Response:', data);
        this.processResponse(data);
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      }
    });
  }

  processResponse(data: MapGroup[]) {
    const sourceProductsMap = new Map<string, Set<string>>();
    const targetProductsSet = new Set<string>();

    data.forEach((item: MapGroup) => {
      if (!sourceProductsMap.has(item.sourceProduct)) {
        sourceProductsMap.set(item.sourceProduct, new Set<string>());
      }
      sourceProductsMap.get(item.sourceProduct)!.add(item.sourceProductVersion || '');
      targetProductsSet.add(item.targetProduct);
    });
    this.sourceProducts = Array.from(sourceProductsMap.keys()).map(product => ({
      name: product,
      versions: Array.from(sourceProductsMap.get(product)!)
    }));
    this.targetProducts = Array.from(targetProductsSet).map(product => ({ name: product }));
  }


  setVersionsForSelectedSourceProduct(event: Event) {
    const selectedSourceValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Source Product:', selectedSourceValue);
    this.selectedSourceProduct = selectedSourceValue;
    const selectedProduct = this.sourceProducts.find(product => product.name === selectedSourceValue);
    this.sourceVersions = selectedProduct ? selectedProduct.versions : [];

    console.log('Available Versions:', this.sourceVersions);
    this.selectedSourceVersion = '';
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
    return productId;
  }

  getTargetProductName(productId: string): string {
    return productId;
  }

  clearForm() {
    const form = document.querySelector('#sample-form') as any;
    form.querySelector('#sourceProductDropdown').value=''
  }
}
