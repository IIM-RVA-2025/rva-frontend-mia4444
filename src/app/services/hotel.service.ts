// Urađeno je...: Servis za komunikaciju sa /hoteli REST endpointom.
// Sadrži metode za CRUD operacije nad entitetom Hotel i mapira payload
// u oblik koji backend očekuje pre slanja.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:8082/hoteli';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/search?q=${query}`);
  }

  create(hotel: Hotel): Observable<Hotel> {
    const payload = this.toBackendPayload(hotel);
    return this.http.post<Hotel>(this.apiUrl, payload);
  }

  update(id: number, hotel: Hotel): Observable<Hotel> {
    const payload = this.toBackendPayload(hotel);
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, payload);
  }

  private toBackendPayload(h: Hotel): any {
    // Ensure broj_zvezdica is a number
    const broj = typeof h.broj_zvezdica === 'number' ? h.broj_zvezdica : Number(h.broj_zvezdica);

    // destinacija may be undefined or have id as string; convert to { id: number } or null
    let dest: any = null;
    if (h.destinacija && (h.destinacija as any).id) {
      const idNum = Number((h.destinacija as any).id);
      dest = isNaN(idNum) ? null : { id: idNum };
    }

    return {
      id: h.id,
      naziv: h.naziv,
      broj_zvezdica: broj,
      opis: h.opis,
      destinacija: dest
    };
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
