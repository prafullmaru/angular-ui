import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Icon {
  id: string;
  icon: string;
  action: () => void;
  isSearch?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private iconsSource = new BehaviorSubject<string[]>([]);
  currentIcons = this.iconsSource.asObservable();

  updateIcons(icons: string[]) {
    this.iconsSource.next(icons);
  }
}
