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
  allMapGroups: MapGroup[] = [];

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
              "paramValue": this.mappingGroupName,
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
    const targetProductsMap = new Map<string, Set<string>>();

    this.allMapGroups = data;

    data.forEach((item: MapGroup) => {
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
