// Urađeno je...: Servis za rad sa destinacijama. Omogućava preuzimanje
// svih destinacija, pretragu, kreiranje, ažuriranje i brisanje putem HTTP
// poziva prema backendu.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinacija } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class DestinacijaService {
  private apiUrl = 'http://localhost:8082/destinacije';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Destinacija[]> {
    return this.http.get<Destinacija[]>(this.apiUrl);
  }

  getById(id: number): Observable<Destinacija> {
    return this.http.get<Destinacija>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<Destinacija[]> {
    return this.http.get<Destinacija[]>(`${this.apiUrl}/search?q=${query}`);
  }

  create(destinacija: Destinacija): Observable<Destinacija> {
    return this.http.post<Destinacija>(this.apiUrl, destinacija);
  }

  update(id: number, destinacija: Destinacija): Observable<Destinacija> {
    return this.http.put<Destinacija>(`${this.apiUrl}/${id}`, destinacija);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
