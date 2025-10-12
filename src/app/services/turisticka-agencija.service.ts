// Urađeno je...: Servis koji komunicira sa backend REST API-jem za
// entitet Turisticka_agencija. Pruža metode za dobijanje liste, pretragu,
// kreiranje, izmenu i brisanje agencija preko HTTP zahteva.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TuristickaAgencija } from '../models/turisticka-agencija.model';

@Injectable({
  providedIn: 'root'
})
export class TuristickaAgencijaService {
  private apiUrl = 'http://localhost:8082/agencije';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TuristickaAgencija[]> {
    return this.http.get<TuristickaAgencija[]>(this.apiUrl);
  }

  getById(id: number): Observable<TuristickaAgencija> {
    return this.http.get<TuristickaAgencija>(`${this.apiUrl}/${id}`);
  }

  getByAdresa(adresa: string): Observable<TuristickaAgencija[]> {
    return this.http.get<TuristickaAgencija[]>(`${this.apiUrl}/adresa/${adresa}`);
  }

  create(agencija: TuristickaAgencija): Observable<TuristickaAgencija> {
    return this.http.post<TuristickaAgencija>(this.apiUrl, agencija);
  }

  update(id: number, agencija: TuristickaAgencija): Observable<TuristickaAgencija> {
    return this.http.put<TuristickaAgencija>(`${this.apiUrl}/${id}`, agencija);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
