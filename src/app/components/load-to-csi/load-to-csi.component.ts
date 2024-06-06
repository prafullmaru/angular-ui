import { Component } from '@angular/core';

@Component({
  selector: 'app-load-to-csi',
  templateUrl: './load-to-csi.component.html',
  styleUrl: './load-to-csi.component.scss'
})
export class LoadToCSIComponent {

  ngAfterViewInit() {
    const form = document.querySelector('#load-to-csi') as any;
    const submitButton = document.querySelector('#load-btn-submit') as any;

    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      form.checkValidation();
      if (form.isValid) {
        console.info('Form Submitted', {
          customer: form.querySelector('#customer').value,
          loaderType: form.querySelector('#loaderType').value,
          siteReference: form.querySelector('#siteReference').value,
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

}
