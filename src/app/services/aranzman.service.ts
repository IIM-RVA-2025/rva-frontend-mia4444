// Urađeno je...: Servis za rad sa aranžmanima (Aranzman). Obezbeđuje
// pozive za dobijanje svih aranžmana, filtriranje placenih, kao i kreiranje,
// ažuriranje i brisanje aranžmana. Preformatira payload tako da backend
// dobija samo id referenci za povezane entitete.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aranzman } from '../models/turisticka-agencija.model';

@Injectable({
  providedIn: 'root'
})
export class AranzmanService {
  private apiUrl = 'http://localhost:8082/aranzmani';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Aranzman[]> {
    return this.http.get<Aranzman[]>(this.apiUrl);
  }

  getById(id: number): Observable<Aranzman> {
    return this.http.get<Aranzman>(`${this.apiUrl}/${id}`);
  }

  getPaid(): Observable<Aranzman[]> {
    return this.http.get<Aranzman[]>(`${this.apiUrl}/placeni`);
  }

  create(aranzman: Aranzman): Observable<Aranzman> {
    const payload = this.toBackendPayload(aranzman);
    return this.http.post<Aranzman>(this.apiUrl, payload);
  }

  update(id: number, aranzman: Aranzman): Observable<Aranzman> {
    const payload = this.toBackendPayload(aranzman);
    return this.http.put<Aranzman>(`${this.apiUrl}/${id}`, payload);
  }

  // Convert frontend Aranzman into a payload shape the backend expects
  private toBackendPayload(a: Aranzman): any {
    // Format date as yyyy-MM-dd (backend accepts common date formats)
    let dateStr: string | null = null;
    if (a.datumRealizacije) {
      const d = new Date(a.datumRealizacije);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dateStr = `${yyyy}-${mm}-${dd}`;
      } else {
        // fallback to raw value
        dateStr = String(a.datumRealizacije);
      }
    }

    return {
      id: a.id,
      ukupnaCena: a.ukupnaCena,
      placeno: a.placeno,
      datumRealizacije: dateStr,
      hotel: a.hotel && a.hotel.id ? { id: a.hotel.id } : null,
      turisticka_agencija: a.turisticka_agencija && a.turisticka_agencija.id ? { id: a.turisticka_agencija.id } : null
    };
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
