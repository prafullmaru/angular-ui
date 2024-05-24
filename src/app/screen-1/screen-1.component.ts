import { Component } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

@Component({
  selector: 'app-screen-1',
  templateUrl: './screen-1.component.html',
  styleUrls: ['./screen-1.component.scss']
})
export class Screen1Component {
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

  save() {
    const formData = {
      customerName: this.customerName,
      selectedSourceProduct: this.selectedSourceProduct,
      selectedSourceVersion: this.selectedSourceVersion,
      selectedTargetProduct: this.selectedTargetProduct,
      mappingGroupName: this.mappingGroupName
    };

    const jsonStr = JSON.stringify(formData);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
