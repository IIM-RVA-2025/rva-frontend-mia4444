// Urađeno je...: Komponenta za upravljanje aranžmanima.
// Opis: Prikazuje aranžmane vezane za izabranu agenciju, omogućava
// dodavanje, izmenu i brisanje aranžmana, i koristi AranzmanService i
// HotelService za komunikaciju sa backendom.
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Aranzman, TuristickaAgencija, Hotel } from '../../models/turisticka-agencija.model';
import { AranzmanService } from '../../services/aranzman.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-aranzman',
  templateUrl: './aranzman.component.html',
  styleUrls: ['./aranzman.component.css']
})
export class AranzmanComponent implements OnInit, OnChanges {
  @Input() selectedAgencija: TuristickaAgencija | null = null;
  
  aranzmani: Aranzman[] = [];
  hoteli: Hotel[] = [];
  showModal = false;
  editingAranzman: Aranzman | null = null;

  constructor(
    private aranzmanService: AranzmanService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.loadHoteli();
  }

  ngOnChanges() {
    if (this.selectedAgencija) {
      this.loadAranzmani();
    }
  }

  loadAranzmani() {
    if (this.selectedAgencija) {
      this.aranzmanService.getAll().subscribe((data: Aranzman[]) => {
        this.aranzmani = data.filter((aranzman: Aranzman) => 
          aranzman.turisticka_agencija?.id === this.selectedAgencija?.id
        );
      });
    }
  }

  loadHoteli() {
    this.hotelService.getAll().subscribe((data: Hotel[]) => {
      this.hoteli = data;
    });
  }

  openAddModal() {
    this.editingAranzman = null;
    this.showModal = true;
  }

  openEditModal(aranzman: Aranzman) {
    this.editingAranzman = { ...aranzman };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingAranzman = null;
  }

  saveAranzman(aranzman: Aranzman) {
    if (this.editingAranzman) {
      // Update existing aranzman
      this.aranzmanService.update(aranzman.id, aranzman).subscribe(() => {
        this.loadAranzmani();
        this.closeModal();
      });
    } else {
      // Create new aranzman
      aranzman.turisticka_agencija = this.selectedAgencija!;
      this.aranzmanService.create(aranzman).subscribe(() => {
        this.loadAranzmani();
        this.closeModal();
      });
    }
  }

  deleteAranzman(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj aranžman?')) {
      this.aranzmanService.delete(id).subscribe(() => {
        this.loadAranzmani();
      });
    }
  }
}
