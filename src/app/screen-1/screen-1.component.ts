import { Component } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

@Component({
  selector: 'app-screen-1',
  templateUrl: './screen-1.component.html',
  styleUrls: ['./screen-1.component.scss']
})
export class Screen1Component {

  selectedSourceVersion: any;
  selectedSourceProduct!: string;
  sourceVersions: string[] = [];

  selectedTargetVersion: any;
  selectedTargetProduct!: string;
  targetVersions: string[] = [];


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
  }

  setVersionsForSelectedTargetProduct(event: Event) {
    const selectedTargetValue = (event.target as HTMLSelectElement).value;
    this.selectedTargetProduct = selectedTargetValue;
    if (this.selectedTargetProduct === 'csi') {
      this.targetVersions = ['2', '2.5', '3'];
    } else if (this.selectedTargetProduct === 'in') {
      this.targetVersions = ['3'];
    } else if (this.selectedTargetProduct === 'csf') {
      this.targetVersions = ['4'];
    }
  }

}
