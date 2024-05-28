import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'ids-enterprise-wc/enterprise-wc.js';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('appMenuDrawer', { read: ElementRef }) appMenuDrawer!: ElementRef<HTMLElement>;
  @ViewChild('appMenuTriggerBtn', { read: ElementRef }) appMenuTriggerBtn!: ElementRef<HTMLElement>;
  public disabled: boolean = true;

  constructor(private router: Router) {}

  navigateTo(screen: string) {
    this.router.navigate([`/${screen}`]);
    console.log(screen);

  }

  ngOnInit(): void {
    console.log('App Menu initialized');
  }

  ngAfterViewInit(): void {
    (this.appMenuDrawer.nativeElement as any).target = this.appMenuTriggerBtn.nativeElement;
  }
  
  disableTriggerButton() {
    this.disabled = true;
  }

  enableTriggerButton() {
    this.disabled = true;
  }

  handleSelected(e: CustomEvent) {
    // console.info(`Header "${(e.target as any).textContent.trim()}" was selected.`);
    console.log('Selected event: ', e.detail);

  }
  
}
