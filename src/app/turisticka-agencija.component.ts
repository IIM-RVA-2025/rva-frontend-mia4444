// Urađeno je...: Komponenta koja prikazuje i upravlja turističkim agencijama.
// Opis: Učitava agencije, upravlja modalom za dodavanje/izmenu i prosleđuje
// događaje roditelju kada je agencija selektovana.
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TuristickaAgencija } from './models/turisticka-agencija.model';
import { TuristickaAgencijaService } from './services/turisticka-agencija.service';
import { SelectionService } from './services/selection.service';

@Component({
  selector: 'app-turisticka-agencija',
  // Switched to an inline minimal template/styles to avoid referencing
  // the duplicate top-level template/style files which were removed.
  template: `<div class="placeholder-turisticka-agencija"></div>`,
  styles: [`.placeholder-turisticka-agencija { display: none; }`]
})
export class TuristickaAgencijaComponent implements OnInit {
  @Output() agencijaSelected = new EventEmitter<TuristickaAgencija>();
  
  turistickeAgencije: TuristickaAgencija[] = [];
  allAgencije: TuristickaAgencija[] = [];
  showModal = false;
  editingAgencija: TuristickaAgencija | null = null;
  searchTerm = '';
  selectedAgencija: TuristickaAgencija | null = null;

  constructor(private turistickaAgencijaService: TuristickaAgencijaService,
              private selectionService: SelectionService) {}

  ngOnInit() {
    this.loadTuristickeAgencije();
  }

  loadTuristickeAgencije() {
    this.turistickaAgencijaService.getAll().subscribe((data: TuristickaAgencija[]) => {
      this.turistickeAgencije = data;
      this.allAgencije = data;
    });
  }

  searchAgencije() {
    const q = this.searchTerm?.trim().toLowerCase();
    if (!q) {
      this.turistickeAgencije = [...this.allAgencije];
      return;
    }
    this.turistickeAgencije = this.allAgencije.filter(a =>
      (a.naziv || '').toLowerCase().includes(q) ||
      (a.adresa || '').toLowerCase().includes(q) ||
      (a.kontakt || '').toLowerCase().includes(q)
    );
  }

  openAddModal() {
    this.editingAgencija = null;
    this.showModal = true;
  }

  openEditModal(agencija: TuristickaAgencija) {
    this.editingAgencija = { ...agencija };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingAgencija = null;
  }

  saveAgencija(agencija: TuristickaAgencija) {
    console.log('TuristickaAgencijaComponent.saveAgencija', agencija, 'editing:', this.editingAgencija);
    if (this.editingAgencija) {
      // Update existing agencija
      this.turistickaAgencijaService.update(agencija.id, agencija).subscribe(() => {
        this.loadTuristickeAgencije();
        this.closeModal();
      });
    } else {
      // Create new agencija
      this.turistickaAgencijaService.create(agencija).subscribe(() => {
        this.loadTuristickeAgencije();
        this.closeModal();
      });
    }
  }

  deleteAgencija(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovu agenciju?')) {
      this.turistickaAgencijaService.delete(id).subscribe(() => {
        this.loadTuristickeAgencije();
      });
    }
  }

  selectAgencija(agencija: TuristickaAgencija) {
    this.agencijaSelected.emit(agencija);
    // keep local selectedAgencija for inline aranzman view
    this.selectedAgencija = agencija;
    // publish selection to the shared selection service so other components (routes) can react
    try {
      this.selectionService.select(agencija);
    } catch (e) {
      // selection service may not be available in tests—ignore
    }
  }
}
