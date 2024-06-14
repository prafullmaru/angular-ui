import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private selectedDataSubject = new BehaviorSubject<any[]>([]);
  selectedData$: Observable<any[]> = this.selectedDataSubject.asObservable();

  setSelectedData(data: any[]) {
    this.selectedDataSubject.next(data);
  }
}
