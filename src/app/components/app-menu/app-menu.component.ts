import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'ids-enterprise-wc/enterprise-wc.js';
import { filter } from 'rxjs';
import { Icon, ToolbarService } from './toolbar.service';

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
  constructor(private router: Router, private toolbarService: ToolbarService) {}

  currentTitle = 'Title';


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
    console.log('App Menu initialized');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.snapshot.root.firstChild;
      if (route && route.data['icons']) {
        this.updateIcons(route.data['icons']);
      }
    });

    this.toolbarService.currentIcons.subscribe(iconIds => {
      this.icons = iconIds.map(id => ({
        id,
        icon: id,
        action: this.getActionForIcon(id)
      }));
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

  updateIcons(iconIds: string[]) {
    this.icons = iconIds.map(id => ({
      id,
      icon: id,
      action: this.getActionForIcon(id)
    }));
  }

  getActionForIcon(icon: string): () => void {
    switch (icon) {
      case 'save':
        return this.save.bind(this);
      case 'cancel':
        return this.cancel.bind(this);
      case 'bolt':
        return this.bolt.bind(this);
      case 'rejected-outline':
        return this.rejectedOutline.bind(this);
      default:
        return () => { console.log(`No action defined for ${icon}`); };
    }
  }

  save() {
    console.log('Save action triggered');
  }

  cancel() {
    console.log('Cancel action triggered');
  }

  bolt() {
    console.log('Bolt action triggered');
  }

  rejectedOutline() {
    console.log('Rejected Outline action triggered');
  }
 
}
