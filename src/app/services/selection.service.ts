import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TuristickaAgencija } from '../models/turisticka-agencija.model';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private agencijaSubject = new BehaviorSubject<TuristickaAgencija | null>(null);

  select(agencija: TuristickaAgencija | null) {
    this.agencijaSubject.next(agencija);
  }

  get selected$(): Observable<TuristickaAgencija | null> {
    return this.agencijaSubject.asObservable();
  }
}
