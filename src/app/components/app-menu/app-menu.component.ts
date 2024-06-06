import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'ids-enterprise-wc/enterprise-wc.js';
import { Screen1Component } from '../screen-1/screen-1.component';
import { Icon } from './toolbar.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit, AfterViewInit {
  icons: Icon[] = [];

  @ViewChild('appMenuDrawer', { read: ElementRef }) appMenuDrawer!: ElementRef<HTMLElement>;
  @ViewChild('appMenuTriggerBtn', { read: ElementRef }) appMenuTriggerBtn!: ElementRef<HTMLElement>;

  public disabled: boolean = true;
  constructor(private router: Router) {}

  currentTitle = 'Welcome! ';
  currentRoute!: string;


  navigateTo(screen: string) {
    switch (screen) {
      case 'screen1':
        this.currentTitle = 'New Customer';
        this.router.navigate([`/${screen}`]);
        break;
      case 'screen2':
        this.currentTitle = 'Customer<br> Inquiry';
        this.router.navigate([`/${screen}`]);
        break;
      // case 'new-customer':
      //   this.currentTitle = 'New Customer';
      //   this.router.navigate(['Screen1Component']);
      //   break;
      default:
        this.currentTitle = 'Title';
    }
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
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


  cancel() {
    console.log('Cancel action triggered');
    if (Screen1Component.instance) {
      Screen1Component.instance.clearForm();
    } else {
      console.error('Screen1Component not available');
    }
  }

  bolt() {
    console.log('Bolt action triggered');
  }

  rejectedOutline() {
    console.log('Rejected Outline action triggered');
  }

  edit() {
    console.log('Edit action triggered')
  }

  add() {
    console.log('add action triggered')
  }
  copy() {
    console.log('Copy action is triggered')
  }
  search() {}
  filter() {}
}
