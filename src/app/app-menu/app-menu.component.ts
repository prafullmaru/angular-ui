import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'ids-enterprise-wc/enterprise-wc.js';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('appMenuDrawer', { read: ElementRef }) appMenuDrawer!: ElementRef<HTMLElement>;
  @ViewChild('appMenuTriggerBtn', { read: ElementRef }) appMenuTriggerBtn!: ElementRef<HTMLElement>;
  public disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('example init');
  }

  ngAfterViewInit(): void {
    (this.appMenuDrawer.nativeElement as any).target = this.appMenuTriggerBtn.nativeElement;
  }
  
  disableTriggerButton() {
    this.disabled = false;
  }

  enableTriggerButton() {
    this.disabled = true;
  }

  handleSelected() {
    
  }

  // handleSelected(e: CustomEvent) {
  //   console.info(`Header "${(e.target as any).textContent.trim()}" was selected.`);
  // }
}
