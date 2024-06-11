import { Component } from '@angular/core';

@Component({
  selector: 'app-load-csv-to-table',
  templateUrl: './load-csv-to-table.component.html',
  styleUrl: './load-csv-to-table.component.scss'
})
export class LoadCsvToTableComponent {

  ngAfterViewInit() {
    const form = document.querySelector('#load-csv-to-table') as any;
    const submitButton = document.querySelector('#load-btn-submit') as any;

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        console.info('Form Submitted', {
          customer: form.querySelector('#customer').value,
          siteReferenceRequired: form.querySelector('#siteReferenceRequired').checked,
          mappingGroupName: form.querySelector('#mappingGroupName').value,
          loaderType: form.querySelector('#loaderType').value,
          sourceFileType: form.querySelector('#sourceFileType').value,
          targetFileType: form.querySelector('#targetFileType').value,
          siteReference: form.querySelector('#siteReference').value,
          targetTable: form.querySelector('#targetTable').value,
          targetFileDelimiter: form.querySelector('#targetFileDelimiter').value,
        });
      } else {
        console.error('Form is invalid');
      }
    });

    submitButton?.addEventListener('click', () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
  }
}
