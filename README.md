# Travel Agency Frontend

Angular frontend porcija aplikacije koja je namenjena podržavanju funkcionisanja poslovanju turističkih agencija
i omogućavanja CRUD operacija nad podacima o glavnim entitetima.

## Karakteristike

- **Hotel**: Create, read, update, and delete (CRUD) hotele
- **Destinacija**: Raspoložive destinacije
- **Turisticka agencija**: Upravljanje turističkim agencijama. Ovde su smešteni i podaci o aranžmanima.
- **Aranžman**: Upravljanje aranžmanima jedne agencije (koji hotel je uplaćen?)


## Navigacija

Aplikacija ima tri glavne sekcije dostupne iz leve bočne trake:

1. **Hotel** — upravljanje hotelima sa brojem zvezdica i opisima
2. **Destinacija** — upravljanje mestima i državama
3. **Turistička agencija** — upravljanje agencijama
   - Klikom na agenciju prikazuju se svi aranžmani za tu agenciju
   - Moguće je dodavati nove aranžmane za izabranu agenciju

## Master-Detail odnos

- Klikom na "Turistička agencija" aplikacija prikazuje sve "Aranžmane" za tu agenciju
- Implementiran je master-detail obrazac gde je agencija master a aranžmani detalji

## Integracija sa backend-om

Frontend se povezuje na Spring Boot backend koji radi na `http://localhost:8082` i koristi sledeće endpoint-e:

- `/hoteli` — operacije nad hotelima
- `/destinacije` — operacije nad destinacijama
- `/agencije` — operacije nad turističkim agencijama
- `/aranzmani` — operacije nad aranžmanima


## Development

### Zahtevi/preduslovi za pokretanje aplikacije

- Node.js (verzija 14 ili novija)
- Angular CLI (može se koristiti preko `npx` ako nije instaliran globalno)
- Pokrenut backend na `localhost:8082`

### Pokretanje aplikacije

1. Instalirajte zavisnosti:

```powershell
npm install
```

2. Pokrenite razvojni server:

```powershell
npx ng serve --open
# ili
npm start
```

3. Otvorite pregledač na `http://localhost:4201` (ili port koji CLI izabere)

### Build za produkciju

```powershell
npx ng build --configuration production
```

## Struktura projekta

```
src/app/
├── models/           # TypeScript interfejsi (modeli podataka)
├── services/         # Servisi za pozive REST API-ju
├── components/       # Angular komponente (UI)
└── app.module.ts     # Glavni modul aplikacije
```

## CRUD operacije (korišćenje u aplikaciji)

- Kreiranje: kliknite na dugme "+" u odgovarajućem delu
- Čitanje: podaci se prikazuju u tabelama
- Izmena: kliknite ikonu za uređivanje (✏️)
- Brisanje: kliknite ikonu za brisanje (🗑️)

## Stil i dizajn

Aplikacija koristi jednostavan i moderan izgled sa:

- Levom bočnom trakom za navigaciju
- Bojama koje označavaju sekcije
- Responsive tabelama i modalnim dijalozima
