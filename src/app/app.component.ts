// Urađeno je...: Glavna komponenta aplikacije. Sadrži navigaciju između
// prikaza (Hotel, Destinacija, Turisticka agencija) i održava stanje
// koji je view trenutno aktivan. Takođe emituje događaje i povezuje
// children komponente.
import { Component } from '@angular/core';
import { TuristickaAgencija } from './models/turisticka-agencija.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rva-frontend';
  currentView = 'hotel';
  selectedAgencija: TuristickaAgencija | null = null;

  setCurrentView(view: string) {
    this.currentView = view;
    this.selectedAgencija = null; // Reset selection when changing views
  }

  onAgencijaSelected(agencija: TuristickaAgencija) {
    this.selectedAgencija = agencija;
  }
}
