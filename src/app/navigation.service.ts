import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentScreen = new BehaviorSubject<string>('screen1');
  currentScreen$ = this.currentScreen.asObservable(); 

  navigateTo(screen: string) {
    this.currentScreen.next(screen);
  }
}