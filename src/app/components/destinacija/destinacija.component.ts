// Urađeno je...: Komponenta za upravljanje destinacijama. Omogućava
// prikaz liste destinacija, pretragu, otvaranje modala za dodavanje i
// izmenu, kao i brisanje destinacija koristeći DestinacijaService.
import { Component, OnInit } from '@angular/core';
import { Destinacija } from '../../models/hotel.model';
import { DestinacijaService } from '../../services/destinacija.service';

@Component({
  selector: 'app-destinacija',
  templateUrl: './destinacija.component.html',
  styleUrls: ['./destinacija.component.css']
})
export class DestinacijaComponent implements OnInit {
  destinacije: Destinacija[] = [];
  showModal = false;
  editingDestinacija: Destinacija | null = null;
  searchTerm = '';

  constructor(private destinacijaService: DestinacijaService) {}

  ngOnInit() {
    this.loadDestinacije();
  }

  loadDestinacije() {
    this.destinacijaService.getAll().subscribe((data: Destinacija[]) => {
      this.destinacije = data;
    });
  }

  openAddModal() {
    this.editingDestinacija = null;
    this.showModal = true;
  }

  openEditModal(destinacija: Destinacija) {
    this.editingDestinacija = { ...destinacija };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingDestinacija = null;
  }

  saveDestinacija(destinacija: Destinacija) {
    if (this.editingDestinacija) {
      // Update existing destinacija
      this.destinacijaService.update(destinacija.id, destinacija).subscribe(() => {
        this.loadDestinacije();
        this.closeModal();
      });
    } else {
      // Create new destinacija
      this.destinacijaService.create(destinacija).subscribe(() => {
        this.loadDestinacije();
        this.closeModal();
      });
    }
  }

  deleteDestinacija(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovu destinaciju?')) {
      this.destinacijaService.delete(id).subscribe(() => {
        this.loadDestinacije();
      });
    }
  }

  searchDestinacije() {
    if (this.searchTerm.trim()) {
      this.destinacijaService.search(this.searchTerm).subscribe((data: Destinacija[]) => {
        this.destinacije = data;
      });
    } else {
      this.loadDestinacije();
    }
  }
}
