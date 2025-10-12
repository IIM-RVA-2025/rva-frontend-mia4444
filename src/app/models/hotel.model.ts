// Urađeno je...: Modeli za Hotel i Destinacija. Definišu polja koja
// frontend očekuje od backend REST API-ja.
export interface Hotel {
  id: number;
  naziv: string;
  broj_zvezdica: number;
  opis: string;
  destinacija?: Destinacija | null;
}

export interface Destinacija {
  id: number;
  mesto: string;
  drzava: string;
  opis: string;
}
