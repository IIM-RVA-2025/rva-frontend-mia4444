// Urađeno je...: Modeli koji predstavljaju TuristickaAgencija i Aranzman
// Tipovi definišu oblik JSON objekata koji se razmenjuju između
// frontend-a i backend-a.
import { Hotel, Destinacija } from './hotel.model';
export { Hotel, Destinacija } from './hotel.model';

export interface TuristickaAgencija {
  id: number;
  naziv: string;
  adresa: string;
  kontakt: string;
}

export interface Aranzman {
  id: number;
  ukupnaCena: number;
  placeno: boolean;
  datumRealizacije: string;
  hotel: Hotel;
  turisticka_agencija: TuristickaAgencija;
}
