// Urađeno je...: Komponenta koja prikazuje i upravlja turističkim agencijama.
// Opis: Učitava agencije, upravlja modalom za dodavanje/izmenu i prosleđuje
// događaje roditelju kada je agencija selektovana.
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TuristickaAgencija } from '../../models/turisticka-agencija.model';
import { TuristickaAgencijaService } from '../../services/turisticka-agencija.service';

@Component({
  selector: 'app-turisticka-agencija',
  templateUrl: './turisticka-agencija.component.html',
  styleUrls: ['./turisticka-agencija.component.css']
})
export class TuristickaAgencijaComponent implements OnInit {
  @Output() agencijaSelected = new EventEmitter<TuristickaAgencija>();
  
  turistickeAgencije: TuristickaAgencija[] = [];
  showModal = false;
  editingAgencija: TuristickaAgencija | null = null;
  searchTerm = '';

  constructor(private turistickaAgencijaService: TuristickaAgencijaService) {}

  ngOnInit() {
    this.loadTuristickeAgencije();
  }

  loadTuristickeAgencije() {
    this.turistickaAgencijaService.getAll().subscribe((data: TuristickaAgencija[]) => {
      this.turistickeAgencije = data;
    });
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
  }
}
